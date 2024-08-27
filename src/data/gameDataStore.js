import { writable } from 'svelte/store';

export default writable({
  timer: {
    blackTime: 0,
    whiteTime: 0,
    activeSide: null
  },
  tiles: [],
  bags: [],
})
