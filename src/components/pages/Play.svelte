<script>
  import { fade } from "svelte/transition";
  import Grid from "../../components/Grid.svelte";
  import Draggable from "../../components/Draggable.svelte";
  import DraggableBank from "../../components/DraggableBank.svelte";
  import Cultist from '../../assets/cultist.svg';
  import ElfHelmet from '../../assets/elf-helmet.svg';
  import OrcHead from '../../assets/orc-head.svg';
  import WoodenCrate from '../../assets/wooden-crate.svg';
  import CrownedSkull from '../../assets/crowned-skull.svg';
  import OverlordHelm from '../../assets/overlord-helm.svg';
  // import DwarfSvg from "../../assets/dwarf-helmet_1.svg";
  // import SpikyPit from '../../assets/spiky-pit.svg';
  // import StoneWall from '../../assets/stone-wall.svg';
  import EnemyDraggable from "../../components/EnemyDraggable.svelte";
  import playIconStore from "../../data/playIcons";
  import Resizable from "../../components/Resizable.svelte";
  import Dice from "../../components/Dice.svelte";

  let additionalDraggableImageSource = '';
  function addEnemyDraggable() {
    console.log(additionalDraggableImageSource);
    if (!additionalDraggableImageSource) return;
    playIconStore.add({src: additionalDraggableImageSource});
    additionalDraggableImageSource = '';
  }

  let dice = [1, 1]
  function addDie() {
    dice = [...dice, 1];
  }

</script>

<div id="play-page">
  <div class="columns">
    <div class="column" id="grid-container">
      <Grid />
      <!-- <Map /> -->
    </div>
    <div class="column">
      <DraggableBank>
        <EnemyDraggable iconImageSrc={ElfHelmet} backgroundColor="#77b7ec" />
        <EnemyDraggable iconImageSrc={Cultist} />
        <EnemyDraggable iconImageSrc={Cultist} />
        <EnemyDraggable iconImageSrc={Cultist} />
        <EnemyDraggable iconImageSrc={OrcHead} />
        <EnemyDraggable iconImageSrc={OrcHead} />
        <EnemyDraggable iconImageSrc={OrcHead} />
        <EnemyDraggable iconImageSrc={CrownedSkull} />
        <EnemyDraggable iconImageSrc={OverlordHelm} />
        <EnemyDraggable iconImageSrc={WoodenCrate} />
        <EnemyDraggable iconImageSrc={WoodenCrate} />
        <EnemyDraggable iconImageSrc={WoodenCrate} />
        {#each $playIconStore as icon}
          <EnemyDraggable iconImageSrc={icon.src} />
        {/each}
      </DraggableBank>
      <div class="field has-addons mt-2">
        <div class="control">
          <input 
            class="input"
            type="text"
            placeholder="https://game-icons.net/icons/ffffff/000000/1x1/caro-asercion/barn-owl.svg"
            bind:value={additionalDraggableImageSource}
          >
        </div>
        <div class="control">
          <button 
            title="add draggable"
            class="button is-dark"
            on:click={addEnemyDraggable}
          >
            <iconify-icon icon="mi:add"></iconify-icon>
          </button>
        </div>
      </div>

      <br>
      <div class="is-flex is-align-items-center" style="height: 40px;">
        {#each dice as die}
          <Dice />
        {/each}
        <button 
          title="add die"
          class="button is-dark ml-3 mt-2"
          style="height: 35px; width: 35px;"
          on:click={addDie}
        >
          <iconify-icon icon="mi:add"></iconify-icon>
        </button>
      </div>
    </div>  
  </div>
</div>
