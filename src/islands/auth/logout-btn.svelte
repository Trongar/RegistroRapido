

<script lang="ts">
  import {  AppwriteService } from "@lib/appwrite"
    
  async function signout() {
    window.location.href = "/account/signout";
  }


</script>

  <button on:click={signout}>
    Sign Out
  </button>