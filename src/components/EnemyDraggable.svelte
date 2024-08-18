<script>
  import { fade } from "svelte/transition";
  import Draggable from "./Draggable.svelte";
  import Cultist from '../assets/cultist.svg'

  export let iconImageSrc = Cultist;
  export let backgroundColor = "none";

  function isMobile() { return window.innerWidth < 768; }

  let showButtons = false;
  function showButtonsTrue() { showButtons = true; }
  function showButtonsFalse() { showButtons = false; }

  function handlePointerEnter(e) {
    e.preventDefault();
    showButtonsTrue()
  }

  function handlePointerLeave(e) {
    e.preventDefault();

    if (!isMobile()) showButtonsFalse()
  }

</script>

<Draggable>
  <!-- <div
    on:pointerenter={handlePointerEnter}
    on:pointerleave={handlePointerLeave}
  > -->
  <div class="m-1">
    <img 
      src={iconImageSrc}
      alt="unit icon"
      style="width: 50px; height: 50px; background-color: {backgroundColor}; border-radius: 2px;" 
    />

    {#if showButtons}
      <div transition:fade class="tags has-addons">
        <span class="tag is-dark">Dark</span>
        <span class="tag is-delete" on:click={showButtonsFalse}></span>
      </div>
    {/if}
  </div>
</Draggable>