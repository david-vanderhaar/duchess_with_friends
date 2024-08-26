<script>
// load game data sessions from persistent store
// then list them in the navbar
// then load them in using PEER.loadSavedGameDataByRoomId

import gameDataPersistentStore from '../data/gameDataPersistentStore';

let PEER;

if (typeof window !== 'undefined') {
  import('../data/peer').then(module => {
    PEER = module.default;
  });
}

let savedGames = [];

gameDataPersistentStore.subscribe((value) => {
  savedGames = value;
});

function handleLoadGame(game) {
  PEER.loadSavedGameData(game);
}
let sortedGames;
$: sortedGames = savedGames.sort((a, b) => {
  return new Date(b.lastModified) - new Date(a.lastModified);
}).slice(0, 5);

// if savedGames has more than 20 items, remove the oldest one
$: if (savedGames.length > 20) {
  gameDataPersistentStore.delete(savedGames.at(-1).uuid);
}
</script>

<!-- bulma list of navbar-items -->
{#if PEER}
<div class="navbar-item has-dropdown is-hoverable">
  <a class="navbar-link">
    Saved Games
  </a>

  <div class="navbar-dropdown">
    {#each sortedGames as game}
      {#if game?.uuid}
      <div class="is-flex">
        <a class="navbar-item" on:click={() => handleLoadGame(game)}>
          {new Date(game.lastModified).toLocaleString()}
        </a>
        <span class="tag is-medium">{game.uuid}</span>
      </div>
      {/if}
    {/each}
  </div>
</div>
{/if}