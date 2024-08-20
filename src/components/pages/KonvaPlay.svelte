<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
  import PEER from '../../data/peer';
  // uuid
  import { v4 as uuidv4 } from 'uuid';
    import Grid from '../Grid.svelte';
    import KonvaGrid from '../KonvaGrid.svelte';

  let roomId = '';
  let gameData = {
    rects: [
      {id: uuidv4(), x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true },
      {id: uuidv4(), x: 300, y: 300, width: 400, height: 200, fill: 'red', draggable: true },
    ],
  }

  PEER.addOnIncomingDataHandler((data) => {
    console.log('incoming data handler');
    gameData = data;
  });

  // Function to handle changes in the Konva canvas
  function handleDragEnd(event) {
    console.log(event);
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

    const connection = PEER.getOutgoingConnection();
    if (connection) {
      connection.send(gameData);
      console.log('sending', gameData);
    }
  }

  function handleDragMove(event) {
    console.log('drag move', event);
    handleDragEnd(event);
  }

  $: PEER;
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    <KonvaGrid height={6} width={6} />
    {#each gameData.rects as rectConfig}
      <Rect 
        config={rectConfig} 
        on:dragend={handleDragEnd}
        on:dragmove={handleDragMove}
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