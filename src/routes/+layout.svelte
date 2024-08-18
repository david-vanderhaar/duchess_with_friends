<script>
  import { SvelteToast } from '@zerodevx/svelte-toast'
  import { base } from "$app/paths";
  import MultiplayerNavbar from '../components/MultiplayerNavbar.svelte';

  let mobileMenuOpen = false;

  function handleClickAway(event) {
    if (mobileMenuOpen) {
      const dropdown = document.querySelector('#navbar-menu-mobile');
      if (!dropdown.contains(event.target)) {
        mobileMenuOpen = false;
      }
    }
  }
</script>

<nav class="navbar section pb-2 pt-4" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item p-0 pr-2" href="{base}/">
      <p class="menu-label">The Duchess</p>
    </a>

    <!-- svelte-ignore a11y-missing-attribute -->
    <a id="navbar-menu-mobile" role="button" class="navbar-burger {mobileMenuOpen ? 'is-active' : ''}" aria-label="menu" aria-expanded="false" data-target="navbar" on:click={() => mobileMenuOpen = !mobileMenuOpen}>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbar" class="navbar-menu {mobileMenuOpen ? 'is-active' : ''}">
    <div class="navbar-start">
      <a class="navbar-item" href="{base}/play">Play</a>
      <a class="navbar-item" href="{base}/">About</a>
      {#if false}
        <MultiplayerNavbar />
      {/if}
    </div>
  </div>
</nav>
<main class="section pt-0"><slot></slot></main>
<SvelteToast options={{ reversed: true, intro: { y: 96 } }} />
<svelte:window on:click={handleClickAway} />



<style>
  /* smooth route transitions */
  #app {
    display: grid;
    height: 100%;
    width: 100%;
    overflow: auto;
    grid-template:
      "nav" 3rem
      "main" 1fr
      / auto;
  }

  nav {
    grid-area: nav;
  }

  main {
    grid-area: main;
    display: grid;
    grid-template-rows: 1fr;
    grid-template-columns: 1fr;
  }

  main > :global(*) {
    grid-row: 1;
    grid-column: 1;
  }

  @media (max-width: 400px) {
    main {
      display: block;
    }
  }
  :root {
    --toastContainerTop: auto;
    --toastContainerRight: auto;
    --toastContainerBottom: 8rem;
    --toastContainerLeft: calc(50vw - 8rem);
    --toastBarHeight: 0;
    --toastBackground: hsl(141, 71%, 48%);
    --toastColor: hsl(141, 53%, 31%);
    --toastBorderRadius: 0.25rem;
  }
</style>
