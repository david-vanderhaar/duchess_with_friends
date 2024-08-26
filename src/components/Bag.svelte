<script>
  import { Image } from 'svelte-konva';
  import DukeImages from '../assets/duke/index';
  import gameDataStore from '../data/gameDataStore';

  export let config;
  export let updateGameDataItemFromEvent;
  export let sendGameData;

  function openCloseBag(event) {
    const shape = event.detail.target;
    const bag = shape.attrs;
    if (bag.state == 'empty') return;

    const isOpen = bag.state === 'open';

    updateGameDataItemFromEvent({
      attrs: {
        state: isOpen ? 'closed' : 'open',
      },
      konvaShape: shape,
    });
  }

  function handleDoubleClickBag(event) {
    const shape = event.detail.target;
    const bagId = shape.attrs.id;

    // remove first tile from bag
    // and add it to the tiles array
    const bag = $gameDataStore.bags.find(bag => bag.id === bagId);
    // if bag is empty, do nothing
    // TODO: give visual feedback that the bag is empty
    if (!bag.tiles.length) return;

    // get random tile from bag
    const randomIndex = Math.floor(Math.random() * bag.tiles.length);
    const tile = bag.tiles[randomIndex];
    const updatedBagTiles = bag.tiles.filter((_, index) => index !== randomIndex);
    const updatedTiles = [...$gameDataStore.tiles, tile];
    const isEmpty = !!!updatedBagTiles.length;
    gameDataStore.set({
      ...$gameDataStore,
      tiles: updatedTiles,
      bags: $gameDataStore.bags.map(bag => {
        if (bag.id !== bagId) return bag;
        return {
          ...bag,
          state: isEmpty ? 'empty' : bag.state,
          tiles: updatedBagTiles,
        }
      }),
    })

    sendGameData();
  }

  function handleMouseOut(event) {
    openCloseBag(event);
    sendGameData();
  }

  function handleMouseOver(event) {
    openCloseBag(event);
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

<Image
  config={{
    ...config,
    image: DukeImages[config.images[config.state || 'closed']],
  }}
  on:dragmove={handleDragMove}
  on:dragend={handleDragEnd}
  on:dblclick={handleDoubleClickBag}
  on:dbltap={handleDoubleClickBag}
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
/>