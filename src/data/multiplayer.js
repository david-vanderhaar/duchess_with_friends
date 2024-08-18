import { createPersistentStore } from '../utils/PersistentStore';

const defaultData = [{
  uuid: '1',
  roomId: null,
  joinedRoomId: null,
}]

export default createPersistentStore('multiplayer', defaultData)