<script>
  import { Stage, Layer, Rect } from 'svelte-konva';
  import { Peer } from 'peerjs';

  let myRoomId = '';
  let roomId = '';
  let peer = new Peer();
  let connection = null;
  let isConnected = false;
  let rectConfig = { x: 100, y: 100, width: 400, height: 200, fill: 'blue', draggable: true };


  peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    myRoomId = id;
  });

  peer.on('connection', function(conn) {
    conn.on('data', function(data){
      console.log('Received', data);
      if (typeof data === 'string' && data.match(/hi! I'm/)) {
        roomId = data.split('hi! I\'m ')[1];
        console.log(`Connected to ${roomId}`);
        
        const conn = peer.connect(roomId);
        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function(){
          // here you have conn.id
          connection = conn;
          isConnected = true;
        });
      } else {
        rectConfig = data;
      }
    });
  });

  function connectTo() {
    if (roomId.length > 0) {
      const conn = peer.connect(roomId);
      // on open will be launch when you successfully connect to PeerServer
      conn.on('open', function(){
        // here you have conn.id
        connection = conn;
        isConnected = true;
        conn.send(`hi! I'm ${myRoomId}`);
      });
    }
  }

  // Function to handle changes in the Konva canvas
  function handleDragEnd(event) {
    console.log(event);
    rectConfig = {
      ...rectConfig,
      x: event.detail.target.attrs.x,
      y: event.detail.target.attrs.y
    };

    if (connection) {
      connection.send(rectConfig);
      console.log('sending', rectConfig);
    }
  }
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
  <div class="multiplayey-container">
    <div class="multiplayer-input">
      <input class="input" type="text" placeholder="Room ID" bind:value={roomId} />
      <button 
        class="button is-primary"
        on:click={connectTo}
        disabled={!roomId.length}
      >
        Connect
      </button>
    </div>
    <div>My Room: {myRoomId}</div>
    {#if isConnected}
      <div>Connected to {roomId}</div>
    {/if}
  </div>
</div>
