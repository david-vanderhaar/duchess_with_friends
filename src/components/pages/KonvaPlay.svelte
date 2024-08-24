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
    }

    return tile;
  }

  let gameData = {
    tiles: [
      {id: uuidv4(), ...createTile({image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 204, y: 401})},
      {id: uuidv4(), ...createTile({image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 301, y: 502})},
      {id: uuidv4(), ...createTile({image: 'DukeFrontElement', flippedImage: 'DukeBackElement', x: 202, y: 502})},
      {id: uuidv4(), ...createTile({image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 294, y: 191, upsideDown: true})},
      {id: uuidv4(), ...createTile({image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 396, y: 92, upsideDown: true})},
      {id: uuidv4(), ...createTile({image: 'DukeFrontElement', flippedImage: 'DukeBackElement', x: 293, y: 100, upsideDown: true})},
    ],
  }

  PEER.addOnIncomingDataHandler((data) => {
    console.log('incoming data handler');
    gameData = data;
  });

  function sendGameData() {
    const connection = PEER.getOutgoingConnection();
    if (connection) {
      connection.send(gameData);
      console.log('sending', gameData);
    }
  }

  function updateTileFromEvent(attrs, konvaShape, tileId, skipKonvaShapeUpdate = false) {
    gameData.tiles = gameData.tiles.map((tile) => {
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
    const tileId = shape.attrs.id;

    const flipped = !tile.flipped;

    updateTileFromEvent(
      {
        flipped,
        image: flipped ? tile.flippedImage : tile.frontImage
      },
      shape,
      tileId
    );
  }

  function handleDragEnd(event) {
    const shape = event.detail.target;
    const tileId = shape.attrs.id;

    updateTileFromEvent(
      {
        x: shape.attrs.x,
        y: shape.attrs.y,
      },
      shape,
      tileId,
      true
    );

    sendGameData();
  }

  function handleDragMove(event) {
    // console.log('drag move', event);
    handleDragEnd(event);
  }

  function handleMouseOver(event) {
    const shape = event.detail.target;
    const tileId = shape.attrs.id;

    updateTileFromEvent(
      {
        shadowBlur: 20,
        shadowOffset: {
          x: 10,
          y: 10
        },
      },
      shape,
      tileId
    );

    sendGameData();
  }

  function handleMouseOut(event) {
    const shape = event.detail.target;
    const tileId = shape.attrs.id;

    updateTileFromEvent(
      {
        shadowBlur: 16,
        shadowOffset: {
          x: 6,
          y: 6
        },
      },
      shape,
      tileId
    );
    
    sendGameData();
  }

  function handleDoubleClick(event) {
    flipTile(event)
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
      <div>You are the Host</div>
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>