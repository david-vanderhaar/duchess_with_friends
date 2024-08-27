<script>
  import PEER from '../data/peer';
  import gameDataStore from '../data/gameDataStore';

  export let hosting = false;
  export let sendGameData = () => null;

  let blackTime = 300
  let whiteTime = 300

  gameDataStore.subscribe((storeData) => {
    blackTime = storeData.timer.blackTime;
    whiteTime = storeData.timer.whiteTime;
  });

  let interval = null;

  function onTimerUpdate({ blackTime, whiteTime }) {
    const newGameData = $gameDataStore;
    newGameData.timer.blackTime = blackTime;
    newGameData.timer.whiteTime = whiteTime;

    gameDataStore.set(newGameData);
    sendGameData();
  }

  PEER.addOnIncomingDataHandler((incomingData) => {
    const timerAction = incomingData?.timerAction;
    const side = incomingData?.side;
    if (timerAction && hosting) {
      if (timerAction === 'start') {
        startTimer(side);
      } else if (timerAction === 'pause') {
        pauseTimer();
      } else if (timerAction === 'reset') {
        resetTimer();
      }

      const newGameData = incomingData;
      delete newGameData.timerAction;
      delete newGameData.side;

      gameDataStore.set(newGameData);
    }
  });

  function stepTimer(side) {
    if (side === 'black') {
      blackTime = Math.max(0, blackTime - 1);
    } else if (side === 'white') {
      whiteTime = Math.max(0, whiteTime - 1);
    }
    if (blackTime === 0 || whiteTime === 0) {
      if (interval) clearInterval(interval);
    }

    // update gameDataStore
    onTimerUpdate({ blackTime, whiteTime });
  }

  function startTimer(side) {
    if (!hosting) {
      PEER.getOutgoingConnection()?.send({ // this set gameDataStore to whatever we send, need to skip that
        timerAction: 'start',
        side,
        ...$gameDataStore,
      });

      return;
    }

    if (interval) clearInterval(interval);
    interval = setInterval(() => {
      stepTimer(side)
      return () => clearInterval(interval);
    }, 1000);
  }

  function pauseTimer() {
    if (!hosting) {
      PEER.getOutgoingConnection()?.send({
        timerAction: 'pause',
        ...$gameDataStore,
      });

      return;
    }

    if (interval) clearInterval(interval);
  }

  function resetTimer() {
    if (!hosting) {
      PEER.getOutgoingConnection()?.send({
        timerAction: 'reset',
        ...$gameDataStore,
      });

      return;
    }

    if (interval) clearInterval(interval);

    // update gameDataStore
    onTimerUpdate({ blackTime: 300, whiteTime: 300 });
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  }
</script>

<div 
  class="timer-container"
  class:has-background-dark={whiteTime > 0 && blackTime > 0}
  class:has-background-danger={whiteTime <= 0 || blackTime <= 0}
>
  <div class="field has-addons">
    <p class="control">
      <button 
        class="button is-normal is-black"
        class:is-danger={blackTime <= 0}
        on:click={() => startTimer('white')}
      >
        <span>{formatTime(blackTime)}</span>
      </button>
    </p>
    <p class="control">
      <button class="button is-normal is-dark has-text-warning" on:click={pauseTimer}>
          <iconify-icon icon="material-symbols-light:timer-pause-outline-rounded"></iconify-icon>
      </button>
    </p>
    <p class="control">
      <button class="button is-normal is-dark has-text-danger" on:click={resetTimer}>
          <iconify-icon icon="material-symbols-light:timer-off-outline-rounded"></iconify-icon>
      </button>
    </p>
    <p class="control">
      <button
        class="button is-normal is-white"
        class:is-danger={whiteTime <= 0}
        on:click={() => startTimer('black')}
      >
        <span>{formatTime(whiteTime)}</span>
      </button>
    </p>
  </div>
</div>

<style>
  .timer-container {
    display: inline-block;
    padding: 1rem;
    border-radius: 5px;
    margin-bottom: 1rem;
  }

</style>
