<script>
  import { Image } from 'svelte-konva';
  import DukeImages from '../assets/duke/index';

  export let config;
  export let updateGameDataItemFromEvent;
  export let sendGameData;

  function flipTile(event) {
    const shape = event.detail.target;
    const tile = shape.attrs;

    const flipped = !tile.flipped;

    updateGameDataItemFromEvent({
      attrs: {
        flipped,
        image: flipped ? tile.flippedImage : tile.frontImage
      },
      konvaShape: shape,
    });
  }

  function handleDragEnd(event) {
    const shape = event.detail.target;

    updateGameDataItemFromEvent({
      attrs:{
        x: shape.attrs.x,
        y: shape.attrs.y,
      },
      konvaShape: shape,
      skipKonvaShapeUpdate: true
    });

    sendGameData();
  }

  function handleDragMove(event) {
    // console.log('drag move', event);
    handleDragEnd(event);
  }

  function handleMouseOver(event) {
    const shape = event.detail.target;

    updateGameDataItemFromEvent({
      attrs: {
        shadowBlur: 20,
        shadowOffset: {
          x: 10,
          y: 10
        },
      },
      konvaShape: shape,
    });

    sendGameData();
  }

  function handleMouseOut(event) {
    const shape = event.detail.target;

    updateGameDataItemFromEvent({
      attrs: {
        shadowBlur: 16,
        shadowOffset: {
          x: 6,
          y: 6
        },
      },
      konvaShape: shape,
    });
    
    sendGameData();
  }

  function handleDoubleClick(event) {
    flipTile(event)
    sendGameData();
  }

  console.log('config', config.image);
  

</script>

<Image 
  config={{...config, image: DukeImages[config.image]}}
  on:mousedown={handleMouseOver}
  on:mouseup={handleMouseOut}
  on:mouseover={handleMouseOver}
  on:mouseout={handleMouseOut}
  on:dragmove={handleDragMove}
  on:dragend={handleDragEnd}
  on:dblclick={handleDoubleClick}
  on:dbltap={handleDoubleClick}
/>