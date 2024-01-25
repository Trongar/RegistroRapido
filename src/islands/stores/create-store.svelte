<script lang="ts">
    import { Button, Modal, Label, Input, Textarea } from "flowbite-svelte";
    let formModal = false;

    import { AppwriteService } from "@lib/appwrite"
    import { storeFormSchema } from "@schemas/store"
    import { safeParse } from "valibot";
    import type { Output } from "valibot";
    import { createForm } from "node_modules/svelte-forms-lib/lib";
    

    
    const initialValues: Output<typeof storeFormSchema> = {
        id: AppwriteService.createID(),
        name: "",
        description: "",
    };    

    const { form, errors, state, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: values => {
            let errors:Partial<Output<typeof storeFormSchema>>  = {};
            const validatedValues  = safeParse(storeFormSchema, values);

            validatedValues.issues?.forEach(issue => {
                const key = issue.path[0].key as keyof typeof errors
                const message = issue.message
                errors[key] = message
            });
            return errors;

        },
        onSubmit: async (values) => {
            console.log(values);
            const formData = new FormData();
            Object.entries(values).forEach(([key, value]:[key:string, value:string]) => {
                formData.append(key, value);
            });
            await fetch("/stores/create", {
                method: "POST",
                body: formData,
            }).then( (value:any) => {
                console.log(value);
                window.location.href = "/stores/" + initialValues.id;
            });
        },
        
    })
</script>

<Button on:click={() => (formModal = true)}>Nueva tienda</Button>

<Modal bind:open={formModal} size="xs" autoclose={false} class="w-full">
    <form class="flex flex-col space-y-6" on:submit|preventDefault={handleSubmit}>
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
            Crea una nueva tienda
        </h3>
        <Label class="space-y-2">
            <span>Nombre</span>
            <Input
                type="text"
                name="name"
                placeholder="ACME Inc."
                on:change={handleChange}
                bind:value={$form.name}
            />
            {#if $errors.name}
                <p class="text-red-500">{$errors.name}</p>
            {/if}
        </Label>
        <Label class="space-y-2">
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

        <Button type="submit" class="w-full1">Crear nueva tienda</Button>
    </form>
</Modal>
