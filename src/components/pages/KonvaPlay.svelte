<script>
  import { Stage, Layer, Rect, Image } from 'svelte-konva';
  import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
  import PEER from '../../data/peer';
  import { v4 as uuidv4 } from 'uuid';
  import KonvaGrid from '../KonvaGrid.svelte';
  import DukeImages from '../../assets/duke/index';
  import { onMount } from 'svelte';
  import Tile from '../Tile.svelte';
  import Bag from '../Bag.svelte';
    import { empty, is_empty } from 'svelte/internal';

  let roomId = '';
  let loaded = false;
  let window = null;

  onMount(() => {
    window = window;
  });
  
  // check if allLoaded is true by interval until it is true
  const checkLoaded = setInterval(() => {
    if (DukeImages.allLoaded()) {
      loaded = true;
      clearInterval(checkLoaded);
    }
  }, 100);
  
  const createTile = ({
    image,
    flippedImage,
    flipped = false,
    x, 
    y, 
    upsideDown = false
  }) => {
    // x and y should be random
    const randomX = Math.random() * 600;
    const randomY = Math.random() * 600;
    let tile = {
      id: uuidv4(),
      x: x || randomX,
      y: y || randomY,
      width: 90,
      height: 90,
      upsideDown,
      // rotation: upsideDown ? 180 : 0,
      scaleY: upsideDown ? -1 : 1,
      scaleX: upsideDown ? -1 : 1,
      image: flipped ? flippedImage : image,
      frontImage: image,
      flippedImage,
      // random color
      fill: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      // shadow blur radius
      shadowBlur: 16,
      // shadow offset
      shadowOffset: {
        x: 6,
        y: 6
      },
      draggable: true,
      gameDataPath: 'tiles',
    }

    return tile;
  }

  const createBag = ({x, y, color, upsideDown = false}) => {
    const id = uuidv4();
    return {
      id,
      x,
      y,
      width: 100,
      height: 100,
      images: {
        closed: upsideDown ? 'BagClosedElement' : 'BagClosedElementBlack',
        open: upsideDown ? 'BagOpenElement' : 'BagOpenElementBlack',
        empty: upsideDown ? 'BagEmptyElement' : 'BagEmptyElementBlack',
      },
      state: 'closed',
      upsideDown,
      draggable: true,
      gameDataPath: 'bags',
      tiles: [
        createTile({bagId: id, image: 'AssassinFrontElement', flippedImage: 'AssassinBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'BowmanFrontElement', flippedImage: 'BowmanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'ChampionFrontElement', flippedImage: 'ChampionBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'DragoonFrontElement', flippedImage: 'DragoonBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'GeneralFrontElement', flippedImage: 'GeneralBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'KnightFrontElement', flippedImage: 'KnightBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'LongbowmanFrontElement', flippedImage: 'LongbowmanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'MarshallFrontElement', flippedImage: 'MarshallBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'PikemanFrontElement', flippedImage: 'PikemanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'PikemanFrontElement', flippedImage: 'PikemanBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'PriestFrontElement', flippedImage: 'PriestBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'RangerFrontElement', flippedImage: 'RangerBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'SeerFrontElement', flippedImage: 'SeerBackElement', x: 214, y: 246, upsideDown}),
        createTile({bagId: id, image: 'WizardFrontElement', flippedImage: 'WizardBackElement', x: 214, y: 246, upsideDown}),
      ],
    }
  }

  const bags = [
    createBag({x: 100, y: 100, color: 'red'}),
    createBag({x: 200, y: 200, color: 'blue', upsideDown: true}),
  ]

  const gameData = writable({
    tiles: [
      createTile({bagId: bags.at(0), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 204, y: 401}),
      createTile({bagId: bags.at(0), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 301, y: 502}),
      createTile({bagId: bags.at(0), image: 'DukeFrontElement', flippedImage: 'DukeBackElement', x: 202, y: 502}),
      createTile({bagId: bags.at(1), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 294, y: 191, upsideDown: true}),
      createTile({bagId: bags.at(1), image: 'FootmanFrontElement', flippedImage: 'FootmanBackElement', x: 396, y: 92, upsideDown: true}),
      createTile({bagId: bags.at(1), image: 'DukeFrontElement', flippedImage: 'DukeBackElement', x: 293, y: 100, upsideDown: true}),
    ],
    bags,
  });

  // set context for gameData for use in child components
  // via getContext('gameData')
  setContext('gameData', gameData);

  PEER.addOnIncomingDataHandler((data) => {
    // console.log('incoming data handler');
    // gameData = data;
    gameData.set(data);
  });

  function sendGameData() {
    const connection = PEER.getOutgoingConnection();
    if (connection) {
      connection.send($gameData);
      // console.log('sending', gameData);
    }
  }

  function updateGameDataItemFromEvent({
    attrs,
    konvaShape,
    skipKonvaShapeUpdate = false
  }) {
    const tileId = konvaShape.attrs.id;
    const gameDataPath = konvaShape.attrs.gameDataPath;

    const newGameData = $gameData
    newGameData[gameDataPath] = newGameData[gameDataPath].map((tile) => {
      if (tile.id !== tileId) return tile;
      return {
        ...tile,
        ...attrs
      };
    });

    gameData.set(newGameData);

    if (skipKonvaShapeUpdate) return;
    konvaShape.setAttrs({...attrs, image: DukeImages[attrs.image]});
  }

  // hack to read changes to PEER.isHost()
  let layerConfig = {};
  setTimeout(() => {
    if (PEER.getOutgoingConnection() && !PEER.isHost()) {
      layerConfig = {scaleY: -1, scaleX: -1, x: 600, y: 600}
    }
  }, 500);
  // end hack

  $: PEER;
</script>

<Stage config={{ width: window?.innerWidth || 800, height: window?.innerHeight || 800 }}>
  <Layer config={layerConfig}>
    <KonvaGrid height={6} width={6} />
    {#if loaded}
      {#each $gameData.tiles as tileConfig}
        <Tile config={tileConfig} {sendGameData} {updateGameDataItemFromEvent} />
      {/each}
      {#each $gameData.bags as bagConfig}
        <Bag config={bagConfig} {sendGameData} {updateGameDataItemFromEvent} />
      {/each}
    {/if}
  </Layer>
</Stage>
<div>
  <div class="multiplayer-container">
    <div>My Room: {PEER.getMyRoomId()}</div>
    {#if PEER.getJoinedRoomId()}
      <div>Connected to {PEER.getJoinedRoomId()}</div>
    {/if}
    {#if PEER.isHost()}
      <div class="host-icon has-background-primary">You are the Host</div>
    {/if}
  </div>
</div>

<style>
  .multiplayer-input {
    display: flex;
    align-items: center;
  }

  .multiplayer-input input {
    margin-right: 0.5rem;
  }

  .multiplayer-container {
    position: relative;
    top: 620px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .host-icon {
    padding: 0.5rem;
    border-radius: 0.5rem;
  }
</style>