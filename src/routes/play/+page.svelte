<script>
  let myRoomId;
  let KonvaPlay;

  if (typeof window !== 'undefined') {
    import('../../components/pages/KonvaPlay.svelte').then(module => {
      KonvaPlay = module.default;
    });

    import('../../data/peer').then(module => {
      const PEER = module.default;
      myRoomId = PEER.getMyRoomId();
      const interval = setInterval(() => {
        myRoomId = PEER.getMyRoomId();

        if (myRoomId) {
          clearInterval(interval);
        }
      }, 100);
    });
  }
</script>

{#if KonvaPlay && myRoomId}
  <KonvaPlay />
{/if}
