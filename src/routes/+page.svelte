<script>
  import { fade } from 'svelte/transition';
  import { base } from "$app/paths";
  import Multiplayer from '../components/Multiplayer.svelte';
  import { goto } from '$app/navigation';

  // goto('/play');
</script>
<div transition:fade class='container'>
  <a class="button is-primary" href="{base}/play">Play</a>
  <!-- anchor tag to go to /play -->
  <!-- <a class="button is-primary" href="{base}/play">Host</a>
  <br>
  <a class="button is-primary" href="{base}/play">Join</a>
  <Multiplayer /> -->
</div>
