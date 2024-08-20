<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
  import PEER from '../../data/peer';

  let roomId = '';
  let rectConfig = { x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true };

  PEER.addOnIncomingDataHandler((data) => {
    console.log('incoming data handler');
    rectConfig = data;
  });

  // Function to handle changes in the Konva canvas
  function handleDragEnd(event) {
    console.log(event);
    rectConfig = {
      ...rectConfig,
      x: event.detail.target.attrs.x,
      y: event.detail.target.attrs.y
    };

    const connection = PEER.getOutgoingConnection();
    if (connection) {
      connection.send(rectConfig);
      console.log('sending', rectConfig);
    }
  }

  $: PEER;
</script>

<Stage config={{ width: window.innerWidth, height: window.innerHeight }}>
  <Layer>
    <Rect 
      config={rectConfig} 
      on:dragend={handleDragEnd}
    />
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