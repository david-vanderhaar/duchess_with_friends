<script>
  import { Peer } from 'peerjs';
  import multiplayerStore from '../data/multiplayer';

  let myRoomId = '';
  let roomId = '';
  let peer = new Peer();
  let connection = null;
  let isConnected = false;

  peer.on('open', function(id) {
    console.log('My peer ID is: ' + id);
    myRoomId = id;
    isConnected = true;

    multiplayerStore.edit('1', {
      roomId: id,
      // peer,
      joinedRoomId: null,
    })
  });

  peer.on('connection', function(conn) {
    conn.on('data', function(data){
      // console.log(conn);
      console.log(data);
      if (data.match(/hi! I'm/)) {
        roomId = data.split('hi! I\'m ')[1];
        console.log(`Connected to ${roomId}`);
        
        roomId = roomId;
        multiplayerStore.edit('1', {
          joinedRoomId: roomId,
          // connection,
        })
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

        multiplayerStore.edit('1', {
          joinedRoomId: roomId,
          // connection,
        })
      });
    }
  }

  // isConnected is determined by the connection state
</script>

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

<style>
  .multiplayey-container {
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
    margin-left: 1rem;
  }

  .multiplayer-input {
    display: flex;
    align-items: center;
  }

  .multiplayer-input input {
    margin-right: 0.5rem;
  }
</style>