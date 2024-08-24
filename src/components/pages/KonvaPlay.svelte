<script>
  import { Stage, Layer, Rect, Image } from 'svelte-konva';
  import PEER from '../../data/peer';
  import { v4 as uuidv4 } from 'uuid';
  import KonvaGrid from '../KonvaGrid.svelte';
  import DukeImages from '../../assets/duke/index';
  import { onMount } from 'svelte';

  let roomId = '';
  let loaded = false;
  let window = null;

  onMount(() => {
    window = window;
  });
  
  // check if allLoaded is true by interval until it is true
  const checkLoaded = setInterval(() => {
    if (DukeImages.allLoaded()) {
      loaded = true;
      clearInterval(checkLoaded);
    }
  }, 100);
  
  const createTile = ({
    image,
    flippedImage,
    flipped = false,
    x, 
    y, 
    upsideDown = false
  }) => {
    // x and y should be random
    const randomX = Math.random() * 600;
    const randomY = Math.random() * 600;
    let tile = {
      id: uuidv4(),
      x: x || randomX,
      y: y || randomY,
      width: 90,
      height: 90,
      // rotation: upsideDown ? 180 : 0,
      scaleY: upsideDown ? -1 : 1,
      scaleX: upsideDown ? -1 : 1,
      image: flipped ? flippedImage : image,
      frontImage: image,
      flippedImage,
      // random color
      fill: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      // shadow blur radius
      shadowBlur: 16,
      // shadow offset
      shadowOffset: {
        x: 6,
        y: 6
      },
      draggable: true,
      gameDataPath: 'tiles',
    }

    return tile;
  }

  const createBag = ({x, y, color, upsideDown = false}) => {
    const id = uuidv4();
    return {
      id,
      x,
      y,
      width: 100,
      height: 100,
      fill: color,
      draggable: true,
      gameDataPath: 'bags',
      tiles: [
        createTile({bagId: id, image: 'AssassinFrontElement', flippedImage: 'AssassinBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'BowmanFrontElement', flippedImage: 'BowmanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'ChampionFrontElement', flippedImage: 'ChampionBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'DragoonFrontElement', flippedImage: 'DragoonBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'GeneralFrontElement', flippedImage: 'GeneralBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'KnightFrontElement', flippedImage: 'KnightBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'LongbowmanFrontElement', flippedImage: 'LongbowmanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'MarshallFrontElement', flippedImage: 'MarshallBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'PikemanFrontElement', flippedImage: 'PikemanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'PikemanFrontElement', flippedImage: 'PikemanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'PriestFrontElement', flippedImage: 'PriestBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'RangerFrontElement', flippedImage: 'RangerBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'SeerFrontElement', flippedImage: 'SeerBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'WizardFrontElement', flippedImage: 'WizardBackElement', x: 214, y: 246, upsideDown}),
      ],
    }
  }

  const bags = [
    createBag({x: 100, y: 100, color: 'red'}),
    createBag({x: 200, y: 200, color: 'blue', upsideDown: true}),
  ]

  let gameData = {
    tiles: [
      createTile({bagId: bags.at(0), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 204, y: 401}),
      createTile({bagId: bags.at(0), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 301, y: 502}),
      createTile({bagId: bags.at(0), image: 'DukeFrontElement', flippedImage: 'DukeBackElement', x: 202, y: 502}),
      createTile({bagId: bags.at(1), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 294, y: 191, upsideDown: true}),
      createTile({bagId: bags.at(1), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 396, y: 92, upsideDown: true}),
      createTile({bagId: bags.at(1), image: 'DukeFrontElement', flippedImage: 'DukeBackElement', x: 293, y: 100, upsideDown: true}),
    ],
    bags,
  }

  PEER.addOnIncomingDataHandler((data) => {
    // console.log('incoming data handler');
    gameData = data;
  });

  function sendGameData() {
    const connection = PEER.getOutgoingConnection();
    if (connection) {
      connection.send(gameData);
      // console.log('sending', gameData);
    }
  }

  function updateGameDataItemFromEvent({
    attrs,
    konvaShape,
    skipKonvaShapeUpdate = false
  }) {
    const tileId = konvaShape.attrs.id;
    const gameDataPath = konvaShape.attrs.gameDataPath;

    gameData[gameDataPath] = gameData[gameDataPath].map((tile) => {
      if (tile.id !== tileId) return tile;
      return {
        ...tile,
        ...attrs
      };
    });

    if (skipKonvaShapeUpdate) return;
    konvaShape.setAttrs({...attrs, image: DukeImages[attrs.image]});
  }

  function flipTile(event) {
    const shape = event.detail.target;
    const tile = shape.attrs;

    const flipped = !tile.flipped;

    updateGameDataItemFromEvent({
      attrs: {
        flipped,
        image: flipped ? tile.flippedImage : tile.frontImage
      },
      konvaShape: shape,
    });
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

  function handleDragMove(event) {
    // console.log('drag move', event);
    handleDragEnd(event);
  }

  function handleMouseOver(event) {
    const shape = event.detail.target;

    updateGameDataItemFromEvent({
      attrs: {
        shadowBlur: 20,
        shadowOffset: {
          x: 10,
          y: 10
        },
      },
      konvaShape: shape,
    });

    sendGameData();
  }

  function handleMouseOut(event) {
    const shape = event.detail.target;

    updateGameDataItemFromEvent({
      attrs: {
        shadowBlur: 16,
        shadowOffset: {
          x: 6,
          y: 6
        },
      },
      konvaShape: shape,
    });
    
    sendGameData();
  }

  function handleDoubleClick(event) {
    flipTile(event)
    sendGameData();
  }

  function handleDoubleClickBag(event) {
    const shape = event.detail.target;
    const bagId = shape.attrs.id;

    // remove first tile from bag
    // and add it to the tiles array
    const bag = gameData.bags.find(bag => bag.id === bagId);
    // if bag is empty, do nothing
    // TODO: give visual feedback that the bag is empty
    if (!bag.tiles.length) return;

    // get random tile from bag
    const randomIndex = Math.floor(Math.random() * bag.tiles.length);
    const tile = bag.tiles[randomIndex];
    const updatedBagTiles = bag.tiles.filter((_, index) => index !== randomIndex);
    const updatedTiles = [...gameData.tiles, tile];

    gameData = {
      ...gameData,
      tiles: updatedTiles,
      bags: gameData.bags.map(bag => {
        if (bag.id !== bagId) return bag;
        return {
          ...bag,
          tiles: updatedBagTiles,
        }
      }),
    }

    sendGameData();
  }

  // hack to read changes to PEER.isHost()
  let layerConfig = {};
  setTimeout(() => {
    if (PEER.getOutgoingConnection() && !PEER.isHost()) {
      layerConfig = {scaleY: -1, scaleX: -1, x: 600, y: 600}
    }
  }, 500);
  // end hack

  $: PEER;
</script>

<Stage config={{ width: window?.innerWidth || 800, height: window?.innerHeight || 800 }}>
  <Layer config={layerConfig}>
    <KonvaGrid height={6} width={6} />
    {#if loaded}
      {#each gameData.tiles as tileConfig}
        <Image 
          config={{...tileConfig, image: DukeImages[tileConfig.image]}}
          on:mousedown={handleMouseOver}
          on:mouseup={handleMouseOut}
          on:mouseover={handleMouseOver}
          on:mouseout={handleMouseOut}
          on:dragmove={handleDragMove}
          on:dragend={handleDragEnd}
          on:dblclick={handleDoubleClick}
        />
      {/each}
      {#each gameData.bags as bagConfig}
        <Rect 
          config={bagConfig}
          on:dragmove={handleDragMove}
          on:dragend={handleDragEnd}
          on:dblclick={handleDoubleClickBag}
        />
      {/each}
    {/if}
  </Layer>
</Stage>
<div>
  <div class="multiplayer-container">
    <div>My Room: {PEER.getMyRoomId()}</div>
    {#if PEER.getJoinedRoomId()}
      <div>Connected to {PEER.getJoinedRoomId()}</div>
    {/if}
    {#if PEER.isHost()}
      <div class="host-icon has-background-primary">You are the Host</div>
    {/if}
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

  .multiplayer-container {
    position: relative;
    top: 620px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .host-icon {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>