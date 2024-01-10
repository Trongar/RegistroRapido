<script>
  export let image = "";
  // get a callback from father component
  export let onClick = () => {};
</script>

<button class="card" on:click={onClick}>
  <div class="image" style={`background-image: URL(${image});`}>
    <div class="avatar is-size-large icon-plus"></div>
  </div>
  <h5 class="text u-bold" style="text-wrap: balance;">
    <slot name="title" />
  </h5>
  <h4 class="text u-font-size-20" style="text-wrap: balance;">
    <slot name="title" />
  </h4>
  <div
    style={`
      border-block-end: solid .0625rem hsl(var(--color-neutral-15));
      border-block-start: solid .0625rem hsl(var(--color-neutral-15));
      display: flex;
  `}
  >
    <div
      class="icon-collection u-text-end"
      style="flex-grow: 1; padding: 8px 16px;"
    >
      12
    </div>
    <div
      style={`
      border-left: solid .0625rem hsl(var(--color-neutral-15));
      margin: 0px 8px;
    `}
    />
    <div
      class="icon-currency-dollar u-text-end"
      style="flex-grow: 1; padding: 8px 16px;"
    >
      70.00
    </div>
  </div>
  <p class="text" style="text-wrap: pretty;">
    <slot name="description" />
  </p>
</button>

<style>
  .card {
    padding: 0;
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .image {
    width: 100%;
    height: 150px;
    /* background-image: url({image}); */
    background-size: cover;
    background-position: center;
    box-shadow: inset 0 -50px 20px -20px hsl(var(--color-neutral-0));
    transition: box-shadow 0.3s ease-out;
    display: grid;
    place-items: center;
  }
  /* when card is hovered image should change boxshadow */
  .card:hover .image {
    box-shadow: inset 0 -100px 50px -50px hsl(var(--color-neutral-5));
  }
  .icon-plus {
    opacity: 0;
    transition: opacity 0.3s ease-out;
  }
  .card:hover .icon-plus {
    opacity: 1;
  }
  h4 {
    margin: 0px 16px 8px 16px;
  }
  h5 {
    margin: 16px 16px 0px 16px;
    font-size: 16px;
  }
</style>
