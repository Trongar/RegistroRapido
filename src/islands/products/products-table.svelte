<script lang="ts">
    import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead, TableHeadCell, TableSearch } from 'flowbite-svelte';
    import type { Product } from '@schemas/product'

    import { products as productsStore, addProduct, setProducts } from "@stores/products"

    export let products: Product[];

    setProducts(products)
    

    let searchTerm = '';
    $: filteredItems = $productsStore.filter((item) => item.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);
  </script>
  
  <TableSearch placeholder="Search by maker name" innerDivClass="flex justify-between" hoverable={true} bind:inputValue={searchTerm}>
    <slot name="head-controls" slot="header" />
    <TableHead>
      <TableHeadCell>Imagen</TableHeadCell>
      <TableHeadCell>Nombre</TableHeadCell>
      <TableHeadCell>Cantidad</TableHeadCell>
      <TableHeadCell>Precio</TableHeadCell>
      <TableHeadCell>Controles</TableHeadCell>
    </TableHead>
    <TableBody >
      {#each filteredItems as item}
        <TableBodyRow>
          <TableBodyCell> <img
            src={item.image}
            class="w-16 md:w-32 max-w-full max-h-full"
            alt={item.name}
          /></TableBodyCell>
          <TableBodyCell>{item.name}</TableBodyCell>
          <TableBodyCell>{item.quantity}</TableBodyCell>
          <TableBodyCell>{item.price}</TableBodyCell>
          <TableBodyCell>Añadir</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </TableSearch>