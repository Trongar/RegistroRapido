<script lang="ts">
  import { string, object, minLength, optional, safeParse } from "valibot";
  import type { Input, Issues } from "valibot";
  import { appwriteTeams } from "@/lib/appwrite";
  import { ID } from "appwrite";

  const NewStoreSchema = object({
    name: string("Necesitar nombrar la nueva tienda", [
      minLength(3, "El nombre de la tienda debe tener al menos 3 caracteres"),
    ]),
    description: optional(string()),
  });
  let errors: Issues | undefined = undefined;
  const newStoreForm: Input<typeof NewStoreSchema> = {
    name: "",
    description: "",
  };
  export let modalOpen = false;
  export let openModal = () => {};
  export let closeModal = () => {};
  const submit = () => {
    const newStore = safeParse(NewStoreSchema, newStoreForm);
    errors = newStore.issues;
    if (errors) {
      return;
    }
    if (newStore.success) {
      appwriteTeams
        .create(ID.unique(), newStore.output.name)
        .then(async (team) => {
          appwriteTeams.updatePrefs(team.$id, {
            description: newStore.output.description,
          });
          window.location.href = `/app/${team.$id}`;
        });
    }
  };
</script>

<div id="backdrop" class="open">
  <dialog id="dialog6" class="modal is-big is-separate-header" open>
    <form class="modal-form" method="dialog" on:submit|preventDefault={submit}>
      <header class="modal-header">
        <div class="u-flex u-main-space-between u-cross-center u-gap-16">
          <h4 class="modal-title heading-level-5"><slot name="title" /></h4>
          <button
            class="button is-text is-small is-only-icon u-cross-center u-margin-inline-start-auto"
            aria-label="Close modal"
            type="button"
            on:click={closeModal}
          >
            <span class="icon-x" aria-hidden="true"></span>
          </button>
        </div>
        <p><slot name="description" /></p>
      </header>
      <div class="modal-content">
        <ul class="form-list">
          <li class="form-item">
            <label for="name" class="label"
              >Nombre <span class="text is-danger">*</span></label
            >
            <div class="input-text-wrapper" style="--amount-of-buttons: 1;">
              <input
                name="name"
                type="text"
                class="input-text"
                placeholder="Ingresa el nombre de tu tienda o división"
                bind:value={newStoreForm.name}
              />
            </div>
          </li>
          <li class="form-item">
            <label class="label" for="desc">Label</label>
            <div class="input-text-wrapper" style="--amount-of-buttons:2">
              <textarea
                name="desc"
                placeholder="Breve descripción de la responsabilidad de esta tienda o división"
                bind:value={newStoreForm.description}
              />
            </div>
          </li>
        </ul>
      </div>

      {#if errors}
        <section
          class="u-margin-auto alert-sticky is-danger"
          style="margin-top: 2em !important;"
        >
          <div class="alert-sticky-image">
            <span class="icon-info" aria-hidden="true"></span>
          </div>
          <div class="alert-sticky-content">
            <h4 class="alert-sticky-title">
              Debes resolver los siguientes problemas
            </h4>
            <ul class="list">
              {#each errors as error}
                <li class="list-item">
                  <span class="icon-x-circle" aria-hidden="true"></span>
                  <span class="text">{error.message}</span>
                </li>
              {/each}
            </ul>
          </div>
        </section>
      {/if}
      <div class="modal-footer">
        <div class="u-flex u-main-end u-gap-16">
          <button type="reset" on:click={closeModal} class="button is-text"
            ><span class="text">Cancelar</span></button
          >
          <button class="button" type="submit"
            ><span class="text">Crear</span></button
          >
        </div>
      </div>
    </form>
  </dialog>
</div>

<style>
  #backdrop {
    display: none;
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10000;
  }
  /* if dialog is open show backdrop */
  #backdrop.open {
    display: block;
  }
  dialog {
    position: fixed;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    margin: unset;
    inset-inline-start: unset;
    z-index: 10000;
  }
</style>
