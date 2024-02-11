<script lang="ts">
    export let stores: Models.Document[] = [];
    export let currentStore: string = "";

    import type { Models } from "appwrite";

    const onChange = (
        e: Event & {
            currentTarget: EventTarget & HTMLInputElement;
        },
    ) => {
        window.location.href = e.currentTarget.value;
    };
</script>

<button
    type="button"
    id="region-dropdown-button"
    data-dropdown-toggle="region-dropdown"
    class="hidden items-center p-2 pr-3 pl-4 font-medium text-gray-500 rounded-lg lg:inline-flex hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
>
    {stores[stores.findIndex((store) => store.$id === currentStore)]?.name ||
        "Selecciona una tienda"}
    <svg
        class="w-3 h-3 ml-1.5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
        ><path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
        ></path></svg
    >
</button>
<div
    id="region-dropdown"
    class="hidden z-10 w-60 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
>
    <ul
        class="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="region-dropdown-button"
    >
        {#each stores as store}
            <li>
                <div
                    class="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                    <div class="flex items-center h-5">
                        <input
                            id={`helper-radio-${store.$id}`}
                            name="helper-radio"
                            type="radio"
                            on:change={onChange}
                            bind:group={currentStore}
                            value={store.$id}
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                        />
                    </div>
                    <div class="ml-2 text-sm">
                        <label
                            for={`helper-radio-${store.$id}`}
                            class="font-medium cursor-pointer text-gray-900 dark:text-gray-300"
                        >
                            <div>{store.name}</div>
                            <p
                                id="helper-radio-text-4"
                                class="text-xs font-normal text-gray-500 dark:text-gray-300"
                            >
                                {store.description}
                            </p>
                        </label>
                    </div>
                </div>
            </li>
        {/each}
        <slot />
    </ul>
</div>
