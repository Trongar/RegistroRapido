<script lang="ts">
  export let products: Product[];

  import type { Product } from "@schemas/product";
  import { products as productsStore, setProducts } from "@stores/products";
  import {
    addToCart,
    getCartItemIndex,
    quitCartItem,
    shoppingCart,
  } from "@stores/shopping-cards";
  import {
    Button,
    Checkbox,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    TableSearch,
  } from "flowbite-svelte";

  setProducts(products);

  let searchTerm = "";
  $: filteredItems = $productsStore
    .filter((item) => item.quantity > 0)
    .filter(
      (item) =>
        item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1,
    );

  const addToCartBtn = (product: Product) => {
    addToCart(product);
  };
</script>

<TableSearch
  placeholder="Search by maker name"
  innerDivClass="flex justify-between"
  hoverable={true}
  bind:inputValue={searchTerm}
>
  <slot name="head-controls" slot="header" />
  <TableHead>
    <TableBodyCell class="!p-4">
      <Checkbox disabled />
    </TableBodyCell>
    <TableHeadCell>Imagen</TableHeadCell>
    <TableHeadCell>Nombre</TableHeadCell>
    <TableHeadCell>Cantidad</TableHeadCell>
    <TableHeadCell>Precio</TableHeadCell>
    <TableHeadCell>Controles</TableHeadCell>
  </TableHead>
  <TableBody>
    {#each filteredItems as item}
      <TableBodyRow>
        <TableBodyCell class="!p-4 flex gap-4">
          <Checkbox
            disabled
            checked={Boolean(
              $shoppingCart[getCartItemIndex(item.$id)]?.quantity,
            )}
          />
          {$shoppingCart[getCartItemIndex(item.$id)]?.quantity ?? 0}
        </TableBodyCell>
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
          <Button color="blue" on:click={() => addToCartBtn(item)}
            >Añadir</Button
          >
          <Button
            color="red"
            on:click={() =>
              shoppingCart.set(quitCartItem(getCartItemIndex(item.$id)))}
            >Quitar</Button
          >
        </TableBodyCell>
      </TableBodyRow>
    {/each}
  </TableBody>
</TableSearch>
