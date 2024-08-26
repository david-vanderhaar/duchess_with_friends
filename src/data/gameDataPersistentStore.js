import {createPersistentStore} from '../utils/PersistentStore.js';

// {
//   hostRoomId: 000-000-000000,
//   gameData: {
//     tiles: [],
//     bags: [],
//   }
// }
export default createPersistentStore('gameDataPersistent', []);
