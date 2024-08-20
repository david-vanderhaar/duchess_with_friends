import Peer from "peerjs";
import { get } from "svelte/store";

const peer = new Peer();

const state = {
  myRoomId: null,
  hostRoomId: null,
  joinedRoomId: null,
  outgoingConnection: null,
  incomingConnection: null,
  onIncomingDataHandlers: [],
}

function setMyRoomId (id) { state.myRoomId = id }
function setJoinedRoomId (id) { state.joinedRoomId = id }
function setHostRoomId (id) { state.hostRoomId = id }
function setOutgoingConnection (connection) { state.outgoingConnection = connection }
function setIncomingConnection (connection) { state.incomingConnection = connection }
function addOnIncomingDataHandler (handler) { state.onIncomingDataHandlers.push(handler) }
function isHost () { return state.myRoomId === state.hostRoomId }

peer.on('open', (id) => {
  console.log(id);
  setMyRoomId(id)
})

peer.on('connection', function(conn) {
  conn.on('data', function(data){
    console.log('Received', data);
    if (typeof data === 'string' && data.match(/hi! I'm/)) {
      if (state.joinedRoomId !== null) {
        console.log('Already connected to a room');
        return;
      }

      const incomingRoomId = data.split('hi! I\'m ')[1];
      const conn = peer.connect(incomingRoomId);
      conn.on('open', function(){
        // setIncomingConnection(conn);
        setOutgoingConnection(conn);
        setJoinedRoomId(incomingRoomId);
        setHostRoomId(state.myRoomId);
        console.log(`Connected to ${incomingRoomId}`);
      });
    } else {
      state.onIncomingDataHandlers.forEach(handler => handler(data));
    }
  });
});

function join(roomId) {
  if (roomId.length > 0) {
    const conn = peer.connect(roomId);
    conn.on('open', function(){
      setHostRoomId(roomId);
      setJoinedRoomId(roomId);
      setOutgoingConnection(conn);
      conn.send(`hi! I'm ${state.myRoomId}`);
    });
  }
}


export default {
  peer,
  getMyRoomId: () => state.myRoomId,
  getJoinedRoomId: () => state.joinedRoomId,
  getOutgoingConnection: () => state.outgoingConnection,
  getIncomingConnection: () => state.incomingConnection,
  setMyRoomId,
  setJoinedRoomId,
  addOnIncomingDataHandler,
  join,
  isHost,
}