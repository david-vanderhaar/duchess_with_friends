<script>
    import Draggable from "./Draggable.svelte";

  export let height = 4;
  export let width = 4;

  const grid_labels = ['A', 'B', 'C', 'D'];
</script>

<div class='grid-container'>
  <div class='tile-grid' >
    {#each Array(height).fill(null) as _, y}
      <div class='grid-row'>
        {#each Array(width).fill(null) as _, x}
          <div class='grid-space'>
            {grid_labels[x]}{y + 1}
          </div>
        {/each}
      </div>
    {/each}
  </div>
</div>

<style>
  .grid-container {
    display: flex;
    position: relative;
    width: calc(100vmin - 86px);
    height: calc(100vmin - 86px);
    margin: auto;
  }

  .tile-grid {
    display: flex;
    flex: 5;
    flex-direction: column;
    border-width: 1px;
  }

  .grid-row {
    display: flex;
    flex: 1;
  }

  .grid-space {
    border: solid;
    border-width: 1px;
    border-color: black;
    color: black;
    display: flex;
    flex: 1;
    transition: 0.4s;
    height: 100%;
    width: 100%;
    padding: 1%;
  }

  .grid-space:hover {
    background-color: 'black';
    color: 'white';
  }
</style>
