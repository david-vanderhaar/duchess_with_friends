<script>
  export let sliderControl = false;
  let scale = 1;
  $: minimumScale = scale <= 0.1;
  $: maximumScale = scale >= 1;

  function handleResize(event) {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    scale = parseFloat(event.target.value);
  }

  function handleSizeDown(event) {
    event.preventDefault();
    scale = Math.max(0.1, scale - 0.1);
  }

  function handleSizeUp(event) {
    event.preventDefault();
    scale = Math.min(1, scale + 0.1);
  }
</script>

<div>
  {#if sliderControl}
    <input 
      type="range"
      min="0.1"
      max="1"
      step="0.1"
      bind:value={scale}
      on:input={handleResize}
    />
  {/if}
    <div>
      <div class="button mr-1 is-small is-outlined" title="drag to move">
        <iconify-icon icon="mdi:drag"></iconify-icon>
      </div>
      <button 
        on:click={handleSizeDown}
        class="button mr-1 is-dark is-small"
        disabled={minimumScale}
      >
        <iconify-icon icon="mi:remove"></iconify-icon>
      </button>
      <button
        on:click={handleSizeUp}
        class="button mr-1 is-dark is-small"
        disabled={maximumScale}
      >
        <iconify-icon icon="mi:add"></iconify-icon>
      </button>
      <slot name="controls"></slot>
    </div>
  <div class="resizable-content" style={`transform: scale(${scale})`}>
    <slot></slot>
  </div>
</div>


<style>
  .resizable-content {
    transform-origin: top left;
    padding: 10px;
    overflow: auto;
  }

  input[type=range] {
    z-index: 100;
  }
</style>

