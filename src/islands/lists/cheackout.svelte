<script>
    import { shoppingCart } from "@stores/shopping-cards";
</script>

{#each shoppingCart.get() as item}
    <div>{item.product.name} - {item.product.price} - {item.quantity}</div>
{/each}
