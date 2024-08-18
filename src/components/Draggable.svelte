<script>
  import { onMount } from 'svelte';
  import { v4 as uuidv4 } from 'uuid';

  export let left = 0;
	export let top = 0;
	
  let id = uuidv4();
  let visibility = 'hidden';
	let moving = false;
  let position = 'initial';
  let isInDangerZone = false;

  function centerOnPointer(event) {
    const draggable = document.getElementById(id);
    left = event.clientX - draggable.getBoundingClientRect().width / 4;
    top = event.clientY - draggable.getBoundingClientRect().height / 4;
  }

  function isMobile() {
    return window.innerWidth < 768;
  }

	function handlePointerDown(e) {
    e.preventDefault();
		moving = true;

    if (position === 'initial') centerOnPointer(e);
	}
	
	function handleWindowPointerMove(e) {
    e.preventDefault();
		if (moving) {
			left += e.movementX;
			top += e.movementY;
      if (position === 'initial') position = 'absolute';

      if (elementIsOverDestroyZone()) isInDangerZone = true;
      else isInDangerZone = false;
		}
	}

  function destroy() {
    const draggable = document.getElementById(id);
    // remove listeners
    draggable.removeEventListener('pointerdown', handlePointerDown);
    window.removeEventListener('pointerup', handleWindowPointerUp);
    window.removeEventListener('pointermove', handleWindowPointerMove);
    
    // remove element
    draggable.remove();


  }

  function elementIsOverDestroyZone() {
    const draggable = document.getElementById(id);
    const destroyZone = document.getElementById('destroy-zone');
    return elementsOverlap(draggable, destroyZone);
  }

  function elementsOverlap(element1, element2) {
    const domRect1 = element1.getBoundingClientRect();
    const domRect2 = element2.getBoundingClientRect();

    return !(
      domRect1.top > domRect2.bottom ||
      domRect1.right < domRect2.left ||
      domRect1.bottom < domRect2.top ||
      domRect1.left > domRect2.right
    );
  }
	
	function handleWindowPointerUp(e) {
    e.preventDefault();
		moving = false;
    if (elementIsOverDestroyZone()) {
      destroy();
    }
	}

  function reset() {
    left = 0;
    top = 0;
    position = 'initial';
  }

  function handleDoubleClick(e) {
    e.preventDefault();
    reset();
  }

  // on mount move this element to it's parent element using left and top
  onMount(() => {
    const draggable = document.getElementById(id);
    const parent = draggable.parentElement;
    const parentRect = parent.getBoundingClientRect();
    // const draggableRect = draggable.getBoundingClientRect();
    const startLeft = parentRect.left;
    const startTop = parentRect.top;
    draggable.style.left = `${startLeft}px`;
    draggable.style.top = `${startTop}px`;

    left = startLeft;
    top = startTop;

    visibility = 'visible';
  });
</script>

<style>
	.draggable {
		user-select: none;
		cursor: move;
    overscroll-behavior: none;
    touch-action: none;
	}

  .is-in-danger-zone {
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


<section 
  style="left: {left}px; top: {top}px; visibility: {visibility}; position: {position};"
  on:pointerdown={handlePointerDown}
  delay={300}
  draggable="false"
  class="draggable"
  class:is-in-danger-zone={isInDangerZone}
  {id}
>
  <slot></slot>
</section>

<svelte:window 
  on:pointerup={handleWindowPointerUp}
  on:pointermove={handleWindowPointerMove}
/>