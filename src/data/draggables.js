import { createPersistentStore } from '../utils/PersistentStore';

const defaultData = []

const store = createPersistentStore('draggables', defaultData)
// clear the store for testing
// store.clear()

export default store