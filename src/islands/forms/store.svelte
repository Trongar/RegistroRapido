<script lang="ts">
    import { getCookie, overwriteCookie } from "@lib/utils";
    import { storeFormSchema } from "@schemas/store";

    import { createForm } from "node_modules/svelte-forms-lib/lib";
    import type { Output } from "valibot";
    import { safeParse } from "valibot";

    $: status = "ok";

    export let initialValues: Output<typeof storeFormSchema> = {
        id: "",
        name: "",
        description: "",
    };

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: (values) => {
            let errors: Partial<Output<typeof storeFormSchema>> = {};
            const validatedValues = safeParse(storeFormSchema, values);

            validatedValues.issues?.forEach((issue) => {
                const key = issue.path[0].key as keyof typeof errors;
                const message = issue.message;
                errors[key] = message;
            });
            return errors;
        },
        onSubmit: async (values) => {
            status = "pending";
            const formData = new FormData();
            Object.entries(values).forEach(
                ([key, value]: [key: string, value: string]) => {
                    formData.append(key, value);
                },
            );
            // create if not id
            if (!initialValues.id) {
                const response = await fetch("/api/stores", {
                    method: "POST",
                    body: formData,
                });
                status = "ok";
                const data = await response.json();

                const accountCookie = getCookie("account");
                let decodedCookie = decodeURIComponent(accountCookie);
                let account = JSON.parse(decodedCookie);
                account.prefs.stores = [...account.prefs.stores, data.store];
                overwriteCookie("account", encodeURI(account));
                window.location.href = data.team.$id;
                return data;
            }
            // else update
            if (initialValues.id) {
                const response = await fetch("/api/stores", {
                    method: "PATCH",
                    body: formData,
                });
                status = "ok";
                const data = await response.json();

                window.location.reload();
                return data;
            }
        },
    });
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
            <label
                for="name"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Nombre de la tienda</label
            >
            <input
                type="text"
                name="name"
                id="name"
                bind:value={$form.name}
                on:change={handleChange}
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe el nombre de la tienda"
            />
            {$errors?.name}
        </div>
        <div class="sm:col-span-2">
            <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
            >
            <textarea
                id="description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe una descipción para tu tienda"
                bind:value={$form.description}
                on:change={handleChange}
            ></textarea>
            {$errors?.description}
        </div>
    </div>
    <div class="items-center space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
        {#if status === "ok"}
            <button
                type="submit"
                class="w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                {#if !initialValues.id}
                    Añadir tienda
                {:else}
                    Editar tienda
                {/if}
            </button>
        {:else}
            <button
                type="submit"
                disabled
                class="opacity-70 cursor-not-allowed w-full sm:w-auto justify-center text-white inline-flex bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
                <svg
                    aria-hidden="true"
                    role="status"
                    class="inline w-4 h-4 me-3 text-white animate-spin"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                    />
                    <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                    />
                </svg>
                Procesando
            </button>
        {/if}
        <button
            data-modal-toggle="create-store-modal"
            type="button"
            class="w-full justify-center sm:w-auto text-gray-500 inline-flex items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
        >
            <svg
                class="mr-1 -ml-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
                ><path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                ></path></svg
            >
            Cancelar
        </button>
    </div>
</form>
