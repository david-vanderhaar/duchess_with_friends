<script>
  import TagInput from "./TagInput.svelte";

  export let selectedTags = [];
  export let availableTags = [];
  export let label = "Tags";
  export let onTagsChange = () => null;
  export let onUpdateTagOptions = () => null;
  export let tagSize = null;
  export let deleteable = true;

  let showEditTags = false;

  function getTagSizeClass() {
    return tagSize ? `tag-picker-size-${tagSize}` : "";
  }

  function toggleTag(tag) {
    if (selectedTags.includes(tag)) {
      selectedTags = selectedTags.filter((t) => t !== tag);
    } else {
      selectedTags = [...selectedTags, tag];
    }
    onTagsChange(selectedTags);
  }

  function removedTags(tags) { return selectedTags.filter((tag) => !tags.includes(tag)); }
  function deselectTags(tags) { tags.forEach((tag) => toggleTag(tag)); }

  function updateTags(tags) {
    deselectTags(removedTags(tags));
    availableTags = tags;
    onUpdateTagOptions(tags);
  }


  function toggleEditTags() {
    showEditTags = !showEditTags;
  }

  function handleEnterOnToggleEdit(event) {
    if (event.key === "Enter") {
      toggleEditTags();
    }
  }

  function handleEnterOnToggleTag(event) {
    if (event.key === "Enter") {
      toggleEditTags();
    }
  }

  $: {
    getTagSizeClass();
  }
</script>

<div class="tag-picker">
  <!-- svelte-ignore a11y-label-has-associated-control -->
  <label class="label">{label}</label>
  {#if showEditTags}
    <TagInput label="" onTagsChange={updateTags} tags={availableTags} {deleteable} />
    <button class="button is-small is-light" on:click={toggleEditTags}>Done</button>
  {:else}
    <div class="tags">
      {#each availableTags as tag}
        <span
          class="tag {getTagSizeClass()}"
          class:selected={selectedTags.includes(tag)}
          on:click={() => toggleTag(tag)}
          on:keydown={handleEnterOnToggleTag}
        >
          {tag}
        </span>
      {/each}
      <span
        class="tag"
        on:click={toggleEditTags}
        on:keydown={handleEnterOnToggleEdit}
      >
        +
      </span>
    </div>
  {/if}
</div>

<style>
  .tag-picker {
    margin-bottom: 1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  .tag {
    margin-right: 0.5rem;
    cursor: pointer;
    padding: 0.25rem;
    border-radius: 4px;
  }

  .tag.selected {
    background-color: #3273dc;
    color: #fff;
  }

  .tag-picker-size-small {
    font-size: 0.75rem;
  }

  .tag-picker-size-medium {
    font-size: 4rem;
    height: 4rem;
  }

  .tag-picker-size-large {
    font-size: 6rem;
    height: 6rem;
  }
</style>
