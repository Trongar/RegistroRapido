<script lang="ts">
  export let products: Product[];

  import type { Product } from "@schemas/product";
  import { products as productsStore, setProducts } from "@stores/products";
  import { addToCart, shoppingCart } from "@stores/shopping-cards";
  import {
    Button,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
  } from "flowbite-svelte";

  setProducts(products);

  let searchTerm = "";
  $: filteredItems = $productsStore.filter(
    (item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
  );

  const addToCartBtn = (product: Product) => {
    addToCart(product);
  };
</script>

{JSON.stringify($shoppingCart)}

<TableSearch
  placeholder="Search by maker name"
  innerDivClass="flex justify-between"
  hoverable={true}
  bind:inputValue={searchTerm}
>
  <slot name="head-controls" slot="header" />
  <TableHead>
    <TableHeadCell>Imagen</TableHeadCell>
    <TableHeadCell>Nombre</TableHeadCell>
    <TableHeadCell>Cantidad</TableHeadCell>
    <TableHeadCell>Precio</TableHeadCell>
    <TableHeadCell>Controles</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each filteredItems as item}
      <TableBodyRow>
        <TableBodyCell>
          <img
            src={item.image}
            class="w-16 md:w-32 max-w-full max-h-full"
            alt={item.name}
          /></TableBodyCell
        >
        <TableBodyCell>{item.name}</TableBodyCell>
        <TableBodyCell>{item.quantity}</TableBodyCell>
        <TableBodyCell>{item.price}</TableBodyCell>
        <TableBodyCell>
          <Button on:click={() => addToCartBtn(item)}>Añadir</Button>
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
