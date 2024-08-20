<script>
  import { Line } from 'svelte-konva';

  export let height = 6;
  export let width = 6;
  const gridSize = 100;

  // all letters in the alphabet
  const grid_labels = Array.from({length: 26}, (_, i) => String.fromCharCode(65 + i));
</script>

{#each Array(height + 1).fill(null) as _, y}
  <Line
    config={{
      points: [0, y * gridSize, width * gridSize, y * gridSize],
      stroke: 'black',
      strokeWidth: 1
    }}
  />
{/each}
{#each Array(width + 1).fill(null) as _, x}
  <Line
    config={{
      points: [x * gridSize, 0, x * gridSize, height * gridSize],
      stroke: 'black',
      strokeWidth: 1
    }}
  />
{/each}
