<script>
  import { Stage, Layer, Rect, Image } from 'svelte-konva';
  import PEER from '../../data/peer';
  import { v4 as uuidv4 } from 'uuid';
  import KonvaGrid from '../KonvaGrid.svelte';
  import DukeImages from '../../assets/duke/index';

  let roomId = '';
  let loaded = false;

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
    return {
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
      draggable: true
    }
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

  // Function to handle changes in the Konva canvas
  function handleDragEnd(event) {
    // console.log(event);
    const tileId = event.detail.target.attrs.id;

    gameData.tiles = gameData.tiles.map((tile) => {
      if (tile.id === tileId) {
        return {
          ...tile,
          x: event.detail.target.attrs.x,
          y: event.detail.target.attrs.y
        };
      }
      return tile;
    });

    sendGameData();
  }

  function handleDragMove(event) {
    // console.log('drag move', event);
    handleDragEnd(event);
  }

  function handleMouseOver(event) {
    // console.log('mouse over', event);
    // increase shadow blur and scale
    const shape = event.detail.target;
    shape.setAttrs({
      shadowBlur: 20,
      shadowOffset: {
        x: 10,
        y: 10
      },
    });

    console.log(shape.x(), shape.y());

    const tileId = event.detail.target.attrs.id;
    const tile = gameData.tiles.find((tile) => tile.id === tileId);
    if (!tile) return;

    tile.shadowBlur = 20;
    tile.shadowOffset = {
      x: 10,
      y: 10
    };

    sendGameData();
  }

  function handleMouseOut(event) {
    // reset shadow blur and scale
    const shape = event.detail.target;
    shape.setAttrs({
      shadowBlur: 16,
      shadowOffset: {
        x: 6,
        y: 6
      },
    });

    const tileId = event.detail.target.attrs.id;
    const tile = gameData.tiles.find((tile) => tile.id === tileId);
    if (!tile) return;

    tile.shadowBlur = 16;
    tile.shadowOffset = {
      x: 6,
      y: 6
    };

    sendGameData();
  }

  function handleDoubleClick(event) {
    // get the tile that was double clicked
    // set the tile to !flipped
    const shape = event.detail.target;
    const flipped = !shape.attrs.flipped;
    shape.setAttrs({
      image: DukeImages[flipped ? shape.attrs.flippedImage : shape.attrs.frontImage],
      flipped
    });

    const tileId = shape.attrs.id;
    const tile = gameData.tiles.find((tile) => tile.id === tileId);
    if (!tile) return;

    tile.flipped = !tile.flipped;
    tile.image = tile.flipped ? tile.flippedImage : tile.frontImage;

    sendGameData();
  }

  // hack to read changes to PEER.isHost()
  let layerConfig = {};
  setTimeout(() => {
    if (!PEER.isHost()) {
      layerConfig = {scaleY: -1, scaleX: -1, x: 600, y: 600}
    }
  }, 500);
  // end hack

  $: PEER;

</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
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
    <div class="multiplayer-input">
      <input class="input" type="text" placeholder="Room ID" bind:value={roomId} />
      <button 
        class="button is-primary"
        on:click={() => PEER.join(roomId)}
        disabled={!roomId.length}
      >
        Connect
      </button>
    </div>
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