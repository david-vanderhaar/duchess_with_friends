<script>
  import { fade } from 'svelte/transition';
  import { base } from "$app/paths";
  import { goto } from '$app/navigation';
  // import PEER from '../data/peer';

  let PEER;

  if (typeof window !== 'undefined') {
    // if we are at the base path
    // make sure there is a trailing slash
    //  if not, add it
    // and go to the base path
    // if (!window.location.pathname.endsWith('/')) {
    //   goto(`${base}/`);
    // }

    import('../data/peer').then(module => {
      PEER = module.default;
    });
  }

  let roomId = '';

  function handleJoin() {
    PEER.join(roomId);
    goto(`${base}/play?roomId=${roomId}`);
  }

  function handleHost() {
    goto(`${base}/play`);
  }

</script>

{#if PEER}
  <div transition:fade class='container'>
    <button class="button is-primary mb-2" on:click={handleHost}>Play</button>
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
{/if}

<style>
  .multiplayer-input {
    display: flex;
    align-items: center;
  }

  .multiplayer-input input {
    margin-right: 0.5rem;
  }
</style>
