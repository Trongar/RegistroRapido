<script lang="ts">
  import { appwriteDatabases, appwriteTeams } from "@lib/appwrite";
  import ProductCard from "@components/cards/product-card.svelte";
  import NewStoreCard from "@/components/cards/new-store-card.svelte";
  const loadProducts = appwriteDatabases
    .listDocuments(
      import.meta.env.PUBLIC_APPWRITE_STORES_DB,
      import.meta.env.PUBLIC_APPWRITE_PRODUCT_COLLECTION
    )
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      return {
        total: 0,
        documents: [],
      };
    });
</script>

{#await loadProducts}
  <p class="paragraph">Cargando tiendas...</p>
{:then products}
  <p class="heading-level-5">Productos disponibles: {products.total}</p>
  <ul class="grid-box">
    {#each products.documents as product}
      <li>
        <ProductCard image={product.image} onClick={() => {}}>
          <svelte:fragment slot="title">{product.name}</svelte:fragment>
          <svelte:fragment slot="description"></svelte:fragment>
        </ProductCard>
      </li>
    {/each}
    <li>
      <NewStoreCard />
    </li>
    <!-- <li>
      <ProductCard>
        <svelte:fragment slot="title">Unirse como colaborador</svelte:fragment>
        <svelte:fragment slot="description">
          Puedes unirte a una tienda como colaborador, de una tienda ya
          existente
        </svelte:fragment>
      </ProductCard>
    </li> -->
  </ul>
{:catch error}
  <p class="paragraph">No se cargaron las tiendas</p>
{/await}
