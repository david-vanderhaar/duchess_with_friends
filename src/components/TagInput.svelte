<script>
  export let tags = [];
  export let onTagsChange;
  export let label = 'Tags';
  export let placeholder = 'enter tags';
  export let deleteable = true;

  let newTag = '';

  function addTag() {
    if (newTag.trim() !== '') {
      const updatedTags = [...tags, newTag.trim()];
      onTagsChange(updatedTags);
      newTag = '';
    }
  }

  function removeTag(index) {
    const updatedTags = tags.filter((_, i) => i !== index);
    onTagsChange(updatedTags);
  }

</script>

<div class="field">
  <label class="label">{label}</label>
  <div class="control">
    <div class="tag-input">
      <div class="field has-addons">
        <div class="control">
          <input
            class="input"
            type="text"
            placeholder={placeholder}
            bind:value={newTag}
            on:keydown={(event) => {
              if (event.key === 'Enter') {
                addTag();
              }
            }}
          />
        </div>
        <div class="control">
          <button 
            class="button is-primary"
            on:click={addTag}
            disabled={!newTag.trim()}
          >
            Add Tag
          </button>
        </div>
      </div>
      <div class="tags">
        {#each tags as tag, index}
          <span class="tag is-secondary">
            {tag}
            {#if deleteable}
              <button class="delete is-small" on:click={() => removeTag(index)}></button>
            {/if}
          </span>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  .tags {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 0.5rem;
  }

  .tag {
    margin-right: 0.5rem;
  }
</style>
