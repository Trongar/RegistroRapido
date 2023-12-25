<script lang="ts">
  import { appwriteTeams } from "@lib/appwrite";
  import { teamsItems } from "@stores/teams";
  import TeamCard from "@components/cards/team-card.svelte";
  import NewStoreCard from "@/components/cards/new-store-card.svelte";
  const laodTeams = appwriteTeams
    .list()
    .then((response) => {
      teamsItems.set(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
</script>

<h1 class="heading-level-1">Tiendas</h1>
{#await laodTeams}
  <p class="paragraph">Cargando tiendas...</p>
{:then _}
  <p class="heading-level-5">Tiendas disponibles: {teamsItems.get().total}</p>
  <ul class="grid-box">
    {#each teamsItems.get().teams as team}
      <li>
        <TeamCard
          icon="icon-shopping-cart"
          onClick={() => (window.location.href = `/app/${team.$id}`)}
        >
          <svelte:fragment slot="title">{team.name}</svelte:fragment>
          <svelte:fragment slot="description"></svelte:fragment>
        </TeamCard>
      </li>
    {/each}
    <li>
      <NewStoreCard />
    </li>
    <li>
      <TeamCard icon="icon-user-add">
        <svelte:fragment slot="title">Unirse como colaborador</svelte:fragment>
        <svelte:fragment slot="description">
          Puedes unirte a una tienda como colaborador, de una tienda ya
          existente
        </svelte:fragment>
      </TeamCard>
    </li>
  </ul>
{:catch error}
  <p class="paragraph">No se cargaron las tiendas</p>
{/await}
