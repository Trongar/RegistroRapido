<script>
  export let icon;
  // get a callback from father component
  export let onClick = () => {};
</script>

<button class="card" on:click={onClick}>
  <div class="avatar is-size-large">
    <span class={icon}></span>
  </div>
  <h4 class="text u-font-size-20 u-bold" style="text-wrap: balance;">
    <slot name="title" />
  </h4>
  <p class="text" style="text-wrap: pretty;">
    <slot name="description" />
  </p>
</button>

<style>
  .card {
    padding: 56px 16px 16px 16px;
    cursor: pointer;
    width: 100%;
    height: 100%;
  }
  h4 {
    margin-top: 16px;
    margin-bottom: 8px;
    font-size: 16px;
  }
</style>
