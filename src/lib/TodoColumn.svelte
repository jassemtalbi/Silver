<script lang="ts">
    import TodoCard from './TodoCard.svelte';
    import { todos, searchQuery, updateTodoStatus, type Todo } from './store';
  
    export let status: 'todo' | 'doing' | 'done';
    export let title: string;
    export let onEdit: (id: number) => void;
    export let onRemove: (id: number) => void;
  
    const handleDrop = (event: DragEvent) => {
      const id = parseInt(event.dataTransfer?.getData('text/plain') || '', 10);
      if (!isNaN(id)) {
        updateTodoStatus(id, status);
      }
      event.preventDefault();
    };
  
    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };
  
    $: filteredTodos = $todos.filter(
      (todo) =>
        todo.status === status &&
        todo.text.toLowerCase().includes($searchQuery.toLowerCase())
    );
  </script>
  
  <div
    class="todo-column"
    role="list"
    aria-label="{title} tasks"
    on:drop={handleDrop}
    on:dragover={handleDragOver}
  >
    <div class="header-container">
      <h2>{title}</h2>
      <!-- <div class="header-accent"></div> -->
    </div>
    {#each filteredTodos as todo (todo.id)}
      <TodoCard {todo} onDrop={updateTodoStatus} onEdit={onEdit} onRemove={onRemove} />
    {:else}
      <p>No tasks in this column.</p>
    {/each}
  </div>
  
  <style>
    .todo-column {
      flex: 1;
      margin: 0 20px;
      padding: 25px;
      border-radius: 15px;
      background-color: #f0f4f8;
      box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
      min-height: 500px;
      overflow-y: auto;
      transition: background-color 0.3s, box-shadow 0.3s;
    }
  
    .todo-column:hover {
      background-color: #e3e8f0;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }
  
    .header-container {
      margin-bottom: 25px;
      position: relative;
    }
  
    h2 {
      margin: 0;
      color: #333;
      font-size: 2.4rem;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      padding-bottom: 15px;
    }
  
    .header-accent {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 6px;
      background-color: #007bff;
      border-radius: 5px;
    }
  
    p {
      color: #777;
      font-size: 1.1rem;
      font-style: italic;
    }
  </style>
  