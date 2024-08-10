<script lang="ts">
    import { searchQuery } from './store';
  
    function handleInput(event: Event) {
      const target = event.target as HTMLInputElement;
      searchQuery.set(target.value);
    }
  </script>
  
  <div class="search-bar">
    <input
      type="text"
      placeholder="Search tasks..."
      on:input={handleInput}
      aria-label="Search tasks"
    />
  </div>
  
  <style>
    .search-bar {
      margin: 10px 0;
      padding: 10px;
      background-color: var(--search-bg-color);
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  
    input[type='text'] {
      width: 100%;
      padding: 8px;
      border-radius: 4px;
      border: 1px solid #ddd;
      box-sizing: border-box;
    }
  </style>
  