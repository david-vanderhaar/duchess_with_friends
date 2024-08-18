<script>
  import Draggable from './Draggable.svelte';

  const numberAsDie = {
    1: '⚀',
    2: '⚁',
    3: '⚂',
    4: '⚃',
    5: '⚄',
    6: '⚅',
  }

  function roll() {
    return Math.floor(Math.random() * 6) + 1;
  }

  let value = roll();
  let shake = false

  function handleClick() {
    shake = true;
    setTimeout(() => {
      value = roll();
      shake = false;
    }, 500);
  }
</script>

<style>
  .die {
    font-size: 60px;
    cursor: pointer;
    user-select: none;
    transition: all 0.5s;
    border-radius: 5px;
  }

  .shake {
    animation: shake 0.5s;
    animation-iteration-count: infinite;
    opacity: 0.5;
  }

  @keyframes shake {
    0% { transform: translate(1px, 1px) rotate(0deg); }
    10% { transform: translate(-1px, -2px) rotate(-10deg); }
    20% { transform: translate(-3px, 0px) rotate(10deg); }
    30% { transform: translate(3px, 2px) rotate(0deg); }
    40% { transform: translate(1px, -1px) rotate(10deg); }
    50% { transform: translate(-1px, 2px) rotate(-10deg); }
    60% { transform: translate(-3px, 1px) rotate(0deg); }
    70% { transform: translate(3px, 1px) rotate(-10deg); }
    80% { transform: translate(-1px, -1px) rotate(10deg); }
    90% { transform: translate(1px, 2px) rotate(0deg); }
    100% { transform: translate(1px, -2px) rotate(-10deg); }
  }
</style>
<Draggable>
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div
    title="tap to roll"
    class="die has-text-dark"
    class:shake={shake}
    on:click={handleClick}
  >
    {numberAsDie[value]}
  </div>
</Draggable>
