<script>
  import PEER from '../../../data/peer';

  export let data;
  console.log('data', data);

  let myRoomId = PEER.getMyRoomId();

  const interval = setInterval(() => {
    myRoomId = PEER.getMyRoomId();

    if (myRoomId) {
      clearInterval(interval);
    }
  }, 100);


  let KonvaPlay;

  if (typeof window !== 'undefined') {
    import('../../../components/pages/KonvaPlay.svelte').then(module => {
      KonvaPlay = module.default;
    });
  }
</script>

{#if KonvaPlay && myRoomId}
  <KonvaPlay roomToJoin={data.slug} />
{/if}
