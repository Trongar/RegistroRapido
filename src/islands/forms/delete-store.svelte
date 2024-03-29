<script lang="ts">
    import { getCookie, overwriteCookie } from "@lib/utils";
    import { deleteFormSchema } from "@schemas/store";
    import type { Models } from "appwrite";

    export let store: Models.Document;

    import { createForm } from "node_modules/svelte-forms-lib/lib";
    import { safeParse, type Output } from "valibot";

    const schema = deleteFormSchema(store.name);
    $: status = "ok";

    export let initialValues = {
        name: "",
    };

    const { form, errors, handleChange, handleSubmit } = createForm({
        initialValues,
        validate: (values) => {
            let errors: Partial<Output<typeof schema>> = {};
            const validatedValues = safeParse(schema, values);
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
            formData.append("id", store.$id);
            await fetch("/api/stores", {
                method: "DELETE",
                body: formData,
            });
            status = "ok";
            const accountCookie = getCookie("account");
            let decodedCookie = decodeURIComponent(accountCookie);
            let account = JSON.parse(decodedCookie);
            account.prefs.stores = Array(account.prefs.stores).filter(
                (item) => item.name !== values.name,
            );
            overwriteCookie("account", encodeURI(account));

            window.location.href = "dashboard";
        },
    });
</script>

<form on:submit|preventDefault={handleSubmit}>
    <div class="mt-2 mb-4">
        <label
            for="repository-name-input"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Por favor escribe el nombre de la tienda para confirmar</label
        >
        <input
            type="text"
            id="repository-name-input"
            bind:value={$form.name}
            on:change={handleChange}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ej: Antojitos"
        />
        {$errors.name}
    </div>
    {#if status === "ok"}
        <button
            type="submit"
            class="justify-center py-2 px-3 w-full text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
        >
            Soy consciente y quiero eliminar esta tienda
        </button>
    {:else}
        <button
            type="submit"
            disabled
            class="opacity-60 cursor-not-allowed justify-center py-2 px-3 w-full text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
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
</form>
