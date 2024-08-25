<script>
  import { Image, Rect } from 'svelte-konva';
  import DukeImages from '../assets/duke/index';
  import { getContext } from 'svelte';

// Retrieve user store from context
  const gameData = getContext('gameData');

  export let config;
  export let updateGameDataItemFromEvent;
  export let sendGameData;

  function handleDoubleClickBag(event) {
    const shape = event.detail.target;
    const bagId = shape.attrs.id;

    // remove first tile from bag
    // and add it to the tiles array
    const bag = $gameData.bags.find(bag => bag.id === bagId);
    // if bag is empty, do nothing
    // TODO: give visual feedback that the bag is empty
    if (!bag.tiles.length) return;

    // get random tile from bag
    const randomIndex = Math.floor(Math.random() * bag.tiles.length);
    const tile = bag.tiles[randomIndex];
    const updatedBagTiles = bag.tiles.filter((_, index) => index !== randomIndex);
    const updatedTiles = [...$gameData.tiles, tile];

    gameData.set({
      ...$gameData,
      tiles: updatedTiles,
      bags: $gameData.bags.map(bag => {
        if (bag.id !== bagId) return bag;
        return {
          ...bag,
          tiles: updatedBagTiles,
        }
      }),
    })

    sendGameData();
  }


  function handleDragEnd(event) {
    const shape = event.detail.target;

    updateGameDataItemFromEvent({
      attrs:{
        x: shape.attrs.x,
        y: shape.attrs.y,
      },
      konvaShape: shape,
      skipKonvaShapeUpdate: true
    });

    sendGameData();
  }

  const handleDragMove = handleDragEnd;

</script>

<Rect 
  {config}
  on:dragmove={handleDragMove}
  on:dragend={handleDragEnd}
  on:dblclick={handleDoubleClickBag}
/>