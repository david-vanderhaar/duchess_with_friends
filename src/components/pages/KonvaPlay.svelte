<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
  import PEER from '../../data/peer';
  // uuid
  import { v4 as uuidv4 } from 'uuid';
    import Grid from '../Grid.svelte';
    import KonvaGrid from '../KonvaGrid.svelte';

  let roomId = '';

  const createRect = () => {
    return {
      x: 300,
      y: 300,
      width: 90,
      height: 90,
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
    rects: [
      {id: uuidv4(), ...createRect()},
      {id: uuidv4(), ...createRect()},
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
    const rectId = event.detail.target.attrs.id;

    gameData.rects = gameData.rects.map((rect) => {
      if (rect.id === rectId) {
        return {
          ...rect,
          x: event.detail.target.attrs.x,
          y: event.detail.target.attrs.y
        };
      }
      return rect;
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

    const rectId = event.detail.target.attrs.id;
    const rect = gameData.rects.find((rect) => rect.id === rectId);
    if (!rect) return;

    rect.shadowBlur = 20;
    rect.shadowOffset = {
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

    const rectId = event.detail.target.attrs.id;
    const rect = gameData.rects.find((rect) => rect.id === rectId);
    if (!rect) return;

    rect.shadowBlur = 16;
    rect.shadowOffset = {
      x: 6,
      y: 6
    };

    sendGameData();
  }

  $: PEER;
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    <KonvaGrid height={6} width={6} />
    {#each gameData.rects as rectConfig}
      <Rect 
        config={rectConfig}
        on:mousedown={handleMouseOver}
        on:mouseup={handleMouseOut}
        on:mouseover={handleMouseOver}
        on:mouseout={handleMouseOut}
        on:dragmove={handleDragMove}
        on:dragend={handleDragEnd}
      />
    {/each}
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