<script>
  import { Stage, Layer } from 'svelte-konva';
  import gameDataStore from '../../data/gameDataStore';
  import PEER from '../../data/peer';
  import { v4 as uuidv4 } from 'uuid';
  import KonvaGrid from '../KonvaGrid.svelte';
  import DukeImages from '../../assets/duke/index';
  import { onMount } from 'svelte';
  import Tile from '../Tile.svelte';
  import Bag from '../Bag.svelte';
  import gameDataPersistentStore from '../../data/gameDataPersistentStore';

  let roomToJoin = null;

  onMount(() => {
    // get roomToJoin from the URL params
    const url = new URL(window.location.href);
    const roomToJoinParam = url.searchParams.get('roomId');
    if (roomToJoinParam) {
      roomToJoin = roomToJoinParam;
      PEER.join(roomToJoin);
    } else {
      PEER.getOutgoingConnection()?.close();
    }
  });

  let loaded = false;
  
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

    // host will be black
    if (!upsideDown) {
      image = `${image}Black`;
      flippedImage = `${flippedImage}Black`;
    }

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
      scaleY: upsideDown ? -1 : 1,
      scaleX: upsideDown ? -1 : 1,
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
    createBag({x: 400, y: 400,}),
    createBag({x: 200, y: 200, upsideDown: true}),
  ]

  gameDataStore.set({
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

  PEER.addOnIncomingDataHandler((data) => {
    // console.log('incoming data handler');
    // gameData = data;
    gameDataStore.set(data);
  });

  function sendGameData() {
    const connection = PEER.getOutgoingConnection();
    if (connection) {
      connection.send($gameDataStore);
      // console.log('sending', gameDataStore);
    }
  }

  function updateGameDataItemFromEvent({
    attrs,
    konvaShape,
    skipKonvaShapeUpdate = false
  }) {
    const tileId = konvaShape.attrs.id;
    const gameDataPath = konvaShape.attrs.gameDataPath;

    const newGameData = $gameDataStore
    newGameData[gameDataPath] = newGameData[gameDataPath].map((tile) => {
      if (tile.id !== tileId) return tile;
      return {
        ...tile,
        ...attrs
      };
    });

    gameDataStore.set(newGameData);

    if (skipKonvaShapeUpdate) return;
    konvaShape.setAttrs({...attrs, image: DukeImages[attrs.image]});
  }

  function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
  }

  function copyToRoomLinkClipboard(roomId) {
    const url = new URL(window.location.href);
    url.searchParams.set('roomId', roomId);
    copyToClipboard(url.toString());
  }

  let layerConfig = {};
  let hostRoomId;
  let myRoomId;
  let joinedRoomId;
  let hosting = true;

  let peerCheckInterval = setInterval(() => {
    // console.log('checking peer');
    
    hostRoomId = PEER.getHostRoomId();
    myRoomId = PEER.getMyRoomId();
    joinedRoomId = PEER.getJoinedRoomId();
    hosting = PEER.isHost();

    // if (hostRoomId && myRoomId && joinedRoomId) {
    //   clearInterval(peerCheckInterval);
    // }

    return () => clearInterval(peerCheckInterval);
  }, 1000);
  
  $: if (hosting) {
    layerConfig = { scaleY: 1, scaleX: 1, x: 0, y: 0 };
  } else {
    layerConfig = { scaleY: -1, scaleX: -1, x: 600, y: 600 };
  }
  $: hosting = hostRoomId === null || myRoomId === hostRoomId;

  // save game data to persistent store every 500ms
  const saveGameInterval = setInterval(() => {
    if (roomToJoin === null)  {
      gameDataPersistentStore.addOrUpdate({
        uuid: myRoomId,
        hostRoomId: myRoomId,
        gameData: $gameDataStore,
        lastModified: new Date(),
      })
    }

    return () => clearInterval(saveGameInterval);
  }, 5000);

  const CANVAS_WIDTH = 800
  // const CANVAS_WIDTH = window?.innerWidth
  const CANVAS_HEIGHT = 800
  // const CANVAS_HEIGHT = window?.innerHeight
</script>

<Stage config={{ width: CANVAS_WIDTH, height: CANVAS_HEIGHT }}>
  <Layer config={layerConfig}>
    <KonvaGrid height={6} width={6} />
    {#if loaded}
      {#each $gameDataStore.tiles as tileConfig}
        <Tile config={tileConfig} {sendGameData} {updateGameDataItemFromEvent} />
      {/each}
      {#each $gameDataStore.bags as bagConfig}
        <Bag config={bagConfig} {sendGameData} {updateGameDataItemFromEvent} />
      {/each}
    {/if}
  </Layer>
</Stage>
<div>
  <div class="multiplayer-container">
    <div class="is-flex mb-2">
      <span class='mr-2'>My Room: {myRoomId || 'waiting'}</span>
      {#if hosting}
        <button class='button is-small' on:click={() => copyToRoomLinkClipboard(myRoomId)}>Copy Invite Link</button>
      {/if}
    </div>
    <div class="is-flex">
      {#if hosting}
        <div class="tag is-medium is-link mr-2">You are the Host</div>
      {/if}
      {#if joinedRoomId}
        <div class='tag is-medium is-success' title={`Connected to ${joinedRoomId}`}>Connected</div>
      {:else}
        <div class='tag is-medium is-danger'>Not Connected</div>
      {/if}
    </div>
  </div>
</div>

<style>
  .multiplayer-container {
    position: relative;
    top: 620px;
    display: flex;
    flex-direction: column;
  }
</style>