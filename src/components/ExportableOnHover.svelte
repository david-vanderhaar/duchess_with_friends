<script>
  import html2canvas from 'html2canvas';
  import { fade } from 'svelte/transition';
  
  export let handleEdit = () => null;
  export let handleDelete = () => null;

  let exportContainer;

  function exportComponent() {
    html2canvas(exportContainer).then(canvas => {
      const pngUrl = canvas.toDataURL('image/png');
      downloadPng(pngUrl);
    });
  }

  function downloadPng(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'rune_card.png';
    link.click();
  }

  let showButtons = false;
  function showButtonsTrue() { showButtons = true; }
  function showButtonsFalse() { showButtons = false; }

  function handlePointerEnter(e) {
    e.preventDefault();
    showButtonsTrue()
  }

  function handlePointerLeave(e) {
    e.preventDefault();
    showButtonsFalse()
  }

  let innerWidth;
  $: isMobile = innerWidth < 768

</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<svelte:window bind:innerWidth={innerWidth} />
<div
  on:pointerenter={handlePointerEnter}
  on:pointerleave={handlePointerLeave}
  style="position: relative;"
>
  <div bind:this={exportContainer}>
    <slot></slot>
  </div>
  {#if !isMobile && showButtons}
    <div class="overlay" transition:fade>
      <div class="centered">
        <button
          class="button is-dark"
          on:click={exportComponent}
        >
          Export as PNG
        </button>
        <div class="is-flex is-flex-direction-row is-flex-wrap-wrap mt-2">
          <button
            class="button is-light"
            on:click={handleEdit}
          >
            Edit
          </button>
          <button
            class="button is-danger ml-2"
            on:click={handleDelete}
          >
            <span class="has-text-light">
              <iconify-icon icon="mi:delete"></iconify-icon>
            </span>
          </button>
        </div>
      </div>
    </div>
  {/if}
  {#if isMobile}
    <div class="mt-2 mb-4 is-flex is-flex-direction-row is-flex-wrap-wrap">
      <button
        class="button mr-1 is-dark"
        on:click={exportComponent}
      >
        Export as PNG
      </button>
      <button
        class="button mr-1 is-light"
        on:click={handleEdit}
      >
        Edit
      </button>
      <button
        class="button mr-1 is-danger is-justify-self-flex-end"
        on:click={handleDelete}
      >
        <span class="has-text-light">
          <iconify-icon icon="mi:delete"></iconify-icon>
        </span>
      </button>
    </div>
  {/if}
</div>

<style>
  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .centered {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>