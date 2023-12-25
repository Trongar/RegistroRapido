<script lang="ts">
  import TeamCard from "@components/cards/team-card.svelte";
  import NewStoreModal from "@components/modals/new-store.svelte";
  let modalOpen = false;
  const openModal = () => {
    modalOpen = true;
    return modalOpen;
  };
  const closeModal = () => {
    modalOpen = false;
    return modalOpen;
  };
</script>

<button class="">
  <TeamCard icon="icon-plus" onClick={() => (modalOpen = true)}>
    <svelte:fragment slot="title">Nueva tienda</svelte:fragment>
    <svelte:fragment slot="description">
      Crea una nueva tienda donde podras administrar tus productos y poder
      realizar registros de las mismas
    </svelte:fragment>
  </TeamCard>
</button>
{#if modalOpen}
  <NewStoreModal {modalOpen} {openModal} {closeModal}>
    <svelte:fragment slot="title">Nueva tienda</svelte:fragment>
    <svelte:fragment slot="description">
      Crea una nueva tienda donde podras administrar tus productos y poder
      realizar registros de las mismas
    </svelte:fragment>
  </NewStoreModal>
{/if}
