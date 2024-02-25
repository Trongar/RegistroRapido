<script lang="ts">
    //! Bug:En modo drawer el campo files no funciona
    import { productFormSchema } from "@schemas/product";
    import type { Models } from "appwrite";
    import { createForm } from "node_modules/svelte-forms-lib/lib";
    import { safeParse, type Output } from "valibot";
    export let storeId: string;
    export let product: Models.Document = undefined;
    const initialValues: Output<typeof productFormSchema> = {
        $id: product?.$id,
        name: product?.name,
        quantity: product?.quantity.toString(),
        // @ts-ignore
        price: (product?.price / 100)?.toString(),
        description: product?.description,
        image: product?.image,
        storeId,
    };
    const { form, errors, state, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: (values) => {
            let errors: { [key: string]: any } = {};
            const validatedValues = safeParse(productFormSchema, values);

            validatedValues.issues?.forEach((issue) => {
                const key = issue.path[0].key as keyof typeof errors;
                const message = issue.message;
                errors[key] = message;
            });
            return errors;
        },
        onSubmit: async (values) => {
            if (files) {
                const url =
                    "https://api.cloudinary.com/v1_1/dx2dsrodq/image/upload";
                let file = files[0];
                const formData = new FormData();
                formData.append("file", file);
                formData.append("upload_preset", "m1yhivjk");
                const response = await fetch(url, {
                    method: "POST",
                    body: formData,
                });
                const data = await response.json();
                values.image = data.secure_url;
            }
            const formData = new FormData();
            Object.entries(values).forEach(
                ([key, value]: [key: string, value: string]) => {
                    formData.append(key, value);
                    formData.append("storeId", storeId);
                },
            );

            await fetch(`/api/products`, {
                method: product ? "PATCH" : "POST",
                body: formData,
            }).then(() => window.location.reload());
        },
    });
    let files: FileList;

    $: if (files) {
        for (const file of files) {
            console.log(`${file.name}: ${file.size} bytes`);
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div
        data-drawer={Boolean(product)}
        class="md:max-h-[70dvh] data-[drawer='true']:max-h-none overflow-auto px-1"
    >
        <div class="grid gap-4 mb-4 sm:grid-cols-2">
            <div>
                <label
                    for="name"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Nombre del producto</label
                >
                <input
                    type="text"
                    name="name"
                    on:change={handleChange}
                    bind:value={$form.name}
                    id="name"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Type product name"
                />
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {$errors.name || ""}
                </p>
            </div>
            <div class="grid gap-4 sm:col-span-2 md:gap-6 sm:grid-cols-4">
                <div>
                    <label
                        for="price"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Precio</label
                    >
                    <input
                        type="number"
                        name="price"
                        on:change={handleChange}
                        bind:value={$form.price}
                        id="price"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="$50.00"
                        step="0.01"
                    />
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {$errors.price || ""}
                    </p>
                </div>
                <div>
                    <label
                        for="width"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >Cantidad</label
                    >
                    <input
                        type="number"
                        name="quantity"
                        bind:value={$form.quantity}
                        on:change={handleChange}
                        id="quantity"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                        placeholder="23"
                    />
                    <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                        {$errors.quantity || ""}
                    </p>
                </div>
            </div>
            <div class="sm:col-span-2">
                <label
                    for="description"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Description</label
                ><textarea
                    id="description"
                    rows="4"
                    on:change={handleChange}
                    bind:value={$form.description}
                    class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Write product description here"
                ></textarea>
                <p class="mt-2 text-sm text-red-600 dark:text-red-500">
                    {$errors.description || ""}
                </p>
            </div>
        </div>
        <div class="mb-4">
            <span
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Imagen del producto</span
            >
            <div class="flex justify-center items-center w-full">
                <label
                    for="dropzone-file"
                    class="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                    <div
                        class="flex flex-col justify-center items-center pt-5 pb-6"
                    >
                        {#if !files}
                            <svg
                                aria-hidden="true"
                                class="mb-3 w-10 h-10 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                            </svg>
                            <p
                                class="mb-2 text-sm text-gray-500 dark:text-gray-400"
                            >
                                <span class="font-semibold"
                                    >Click to upload</span
                                >
                                or drag and drop
                            </p>
                            <p class="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                        {:else}
                            <img
                                src={URL.createObjectURL(files[0])}
                                alt="preview"
                                class="w-60 h-auto"
                            />
                        {/if}
                    </div>
                    <input
                        id="dropzone-file"
                        bind:files
                        type="file"
                        accept="image/png, image/jpeg, image/gif, image/svg"
                        class="hidden"
                    />
                </label>
            </div>
        </div>
    </div>
    <div class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        {#if !product}
            <button
                type="submit"
                class="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >Añadir producto</button
            >
            <button
                data-modal-toggle="create-product-modal"
                data-modal-target="create-product-modal"
                type="button"
                class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
                <svg
                    class="mr-1 -ml-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                    ></path>
                </svg>
                Descartar
            </button>
        {:else}
            <button
                type="submit"
                class="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >Editar producto</button
            >
        {/if}
    </div>
</form>
