<script lang="ts">
    import { Button, Label, Input, Textarea } from "flowbite-svelte";

    import { productFormSchema } from "@schemas/product"
    import { number, safeParse } from "valibot";
    import type { Output } from "valibot";
    import { createForm } from "node_modules/svelte-forms-lib/lib";
    import { addProduct } from "@stores/products"
    
    export let storeId;
    
    const initialValues: Output<typeof productFormSchema> = {
        name: undefined,
        description: undefined,
        image: undefined,
        price: undefined,
        quantity: undefined,
    };    

    const { form, errors, state, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: values => {
            let errors: {[key:string] : any} = {};
            const validatedValues  = safeParse(productFormSchema, values);

            validatedValues.issues?.forEach(issue => {
                const key = issue.path[0].key as keyof typeof errors
                const message = issue.message
                errors[key] = message
            });
            return errors;
        },
        onSubmit: async (values) => {
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]:[key:string, value:string]) => {
                formData.append(key, value);
                formData.append("storeId", storeId)
            });
            await fetch(`/stores/${storeId}/new-product`, {
                method: "POST",
                body: formData,
            }).then( () => {
                window.location.reload()
            });
        },
        
    })
</script>
{JSON.stringify($form)}
<form class="p-4 md:p-5" on:submit|preventDefault={handleSubmit}>
    <div class="grid gap-4 mb-4 grid-cols-2">
        <Label class="col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <span>Nombre</span>
            <Input
                type="text"
                name="name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe el nombre del producto"
                on:change={handleChange}
                bind:value={$form.name}
            />
            {#if $errors.name}
                <p class="text-red-500">{$errors.name}</p>
            {/if}
        </Label>
        <Label class="col-span-2 space-y-2">
            <span>Descripción</span>
            <Textarea
                name="description"
                placeholder="Descripción de la tienda"
                on:change={handleChange}
                bind:value={$form.description}
            />
            {#if $errors.description}
                <p class="text-red-500">{$errors.description}</p>
            {/if}
        </Label>
        <Label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <span>Precio</span>
            <Input
                type="number"
                name="price"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="$50.00"
                step="0.01"
                on:change={handleChange}
                bind:value={$form.price}
            />
            {#if $errors.price}
                <p class="text-red-500">{$errors.price}</p>
            {/if}
        </Label>
        <Label class=" block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <span>Cantidad</span>
            <Input
                type="number"
                name="quantity"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="15"
                on:change={handleChange}
                bind:value={$form.quantity}
            />
            {#if $errors.quantity}
                <p class="text-red-500">{$errors.quantity}</p>
            {/if}
        </Label>
        <Label class="col-span-2 block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            <span>Imagen</span>
            <Input
                type="text"
                name="image"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Escribe la url de la imagen"
                on:change={handleChange}
                bind:value={$form.image}
            />
            {#if $errors.image}
                <p class="text-red-500">{$errors.image}</p>
            {/if}
        </Label>
    </div>

    <Button type="submit" class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        <svg
        class="me-1 -ms-1 w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill-rule="evenodd"
          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
          clip-rule="evenodd"></path></svg
      >
      Añadir producto
    </Button>
</form>
