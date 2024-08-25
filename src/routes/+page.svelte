<script>
  import { fade } from 'svelte/transition';
  import { base } from "$app/paths";
  import { goto } from '$app/navigation';
  import PEER from '../data/peer';

  let roomId = '';

  function handleJoin() {
    PEER.join(roomId);
    goto(`${base}/play/${roomId}`);
  }

  function handleHost() {
    // PEER.reset();
    goto(`${base}/play`);
  }

</script>

<div transition:fade class='container'>
  <button class="button is-primary" on:click={handleHost}>Host</button>
  <div class="multiplayer-input">
    <input class="input" type="text" placeholder="Room ID" bind:value={roomId} />
    <button 
      class="button is-primary"
      on:click={handleJoin}
      disabled={!roomId.length}
    >
      Join
    </button>
  </div>
</div>

<style>
  .multiplayer-input {
    display: flex;
    align-items: center;
  }

  .multiplayer-input input {
    margin-right: 0.5rem;
  }
</style>
