import Peer from "peerjs";
import gameDataStore from './gameDataStore';
import { get } from "svelte/store";
import { goto } from "$app/navigation";

function startNewPeer() {
  const peer = new Peer()

  const state = {
    myRoomId: null,
    hostRoomId: null,
    joinedRoomId: null,
    outgoingConnection: null,
    incomingConnection: null,
    onIncomingDataHandlers: [],
    hosting: true,
  }

  function setMyRoomId (id) { state.myRoomId = id }
  function setJoinedRoomId (id) { state.joinedRoomId = id }
  function setHostRoomId (id) { state.hostRoomId = id }
  function setOutgoingConnection (connection) { state.outgoingConnection = connection }
  function setIncomingConnection (connection) { state.incomingConnection = connection }
  function addOnIncomingDataHandler (handler) { state.onIncomingDataHandlers.push(handler) }
  // function isHost () { return state.hostRoomId === null || state.myRoomId === state.hostRoomId }
  function isHost () { return state.hosting }

  peer.on('open', (id) => {
    console.log('open ', id);
    setMyRoomId(id)
  })

  peer.on('connection', function(conn) {
    conn.on('data', function(data) {
      // console.log('Received', data);
      if (typeof data === 'string' && data.match(/hi! I'm/)) {
        // use this block is we should block incoming connections if we're already connected to a room
        // if (state.joinedRoomId !== null) {
        //   console.log('Already connected to a room');
        //   return;
        // }

        // use this block to switch over to incoming connection if we're already connected to a room
        if (state.joinedRoomId !== null) {
          console.log('Already connected to a room but accepting incoming connection anyways');
          // conn.close();
          // state.outgoingConnection.close();
          // setOutgoingConnection(null);
          // setJoinedRoomId(null);
        }

        // or just accept more than one connection?

        const incomingRoomId = data.split('hi! I\'m ')[1];
        const newConnection = peer.connect(incomingRoomId);
        newConnection.on('open', function(){
          // setIncomingConnection(conn);
          setOutgoingConnection(newConnection);
          setJoinedRoomId(incomingRoomId);
          setHostRoomId(state.myRoomId);
          // send gameData
          console.log('Sending gameData');
          newConnection.send(get(gameDataStore))
          
          // newConnection.send(gameDataStore);
          console.log(`Connected to ${incomingRoomId}`);
        });

        // on disconnect, set outgoingConnection to null, and set joinedRoomId to null
        newConnection.on('close', function() {
          setOutgoingConnection(null);
          setJoinedRoomId(null);
          setHostRoomId(null);
          state.hosting = true;
          console.log('Disconnected from room');
        });
      } else {
        state.onIncomingDataHandlers.forEach(handler => handler(data));
      }
    });

    conn.on('close', function() {
      // setIncomingConnection(null);
      console.log('Disconnected from peer');
    })
  });

  function join(roomId) {
    console.log('Joining room', roomId);
    
    if (roomId.length > 0) {
      const conn = peer.connect(roomId);
      conn.on('open', function(){
        setHostRoomId(roomId);
        setJoinedRoomId(roomId);
        setOutgoingConnection(conn);
        state.hosting = false;
        conn.send(`hi! I'm ${state.myRoomId}`);
      });

      // on disconnect, set outgoingConnection to null, and set joinedRoomId to null
      conn.on('close', function() {
        setOutgoingConnection(null);
        setJoinedRoomId(null);
        setHostRoomId(null);
        state.hosting = true;
        console.log('Disconnected from room');
      });
    }
  }

  return {
    peer,
    getMyRoomId: () => state.myRoomId,
    getJoinedRoomId: () => state.joinedRoomId,
    getHostRoomId: () => state.hostRoomId,
    getOutgoingConnection: () => state.outgoingConnection,
    getIncomingConnection: () => state.incomingConnection,
    setMyRoomId,
    setJoinedRoomId,
    addOnIncomingDataHandler,
    getIncomingDataHandlers: () => state.onIncomingDataHandlers,
    setIncomingDataHandlers: (incoming) => state.onIncomingDataHandlers = incoming,
    join,
    isHost,
  }
}

let newPeer = startNewPeer()
function loadSavedGameData(data) {
  // const savedRoomId = data.hostRoomId;
  // // prev incomingDataHandlers
  // const prevIncomingDataHandlers = newPeer.getIncomingDataHandlers();
  // newPeer = startNewPeer(savedRoomId);
  // newPeer.setIncomingDataHandlers(prevIncomingDataHandlers);
  const savedGameData = data.gameData;
  gameDataStore.set(savedGameData);

  // toast with a message that the game has been loaded
  // and that the host should send a new link to the other players
  alert('Game loaded. Host should send a new link to other players');
}

export default {...newPeer, loadSavedGameData};
// export default {
//   peer,
//   getMyRoomId: () => state.myRoomId,
//   getJoinedRoomId: () => state.joinedRoomId,
//   getHostRoomId: () => state.hostRoomId,
//   getOutgoingConnection: () => state.outgoingConnection,
//   getIncomingConnection: () => state.incomingConnection,
//   setMyRoomId,
//   setJoinedRoomId,
//   addOnIncomingDataHandler,
//   join,
//   isHost,
// }