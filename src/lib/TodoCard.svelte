<script lang="ts">
    export let todo: {
      id: number;
      text: string;
      description?: string;
      dueDate?: string;
      priority: 'low' | 'medium' | 'high';
      status: 'todo' | 'doing' | 'done';
    };
    export let onDrop: (id: number, newStatus: 'todo' | 'doing' | 'done') => void;
    export let onEdit: (id: number) => void;
    export let onRemove: (id: number) => void;
  
    function handleDragStart(event: DragEvent) {
      event.dataTransfer?.setData('text/plain', String(todo.id));
    }
  </script>
  
  <div
    class="todo-card"
    draggable="true"
    on:dragstart={handleDragStart}
    on:drop={(e) => e.preventDefault()}
  >
    <div class="card-content">
      <p class="task-title">{todo.text}</p>
      <span class="priority {todo.priority}">{todo.priority}</span>
      {#if todo.description}
        <p class="description">{todo.description}</p>
      {/if}
      {#if todo.dueDate}
        <p class="due-date">Due: {todo.dueDate}</p>
      {/if}
    </div>
    <div class="card-actions">
      <!-- Edit and remove icons below task data -->
      <button on:click={() => onEdit(todo.id)} title="Edit Task">✎ Edit</button>
      <button on:click={() => onRemove(todo.id)} title="Remove Task">✖ Remove</button>
    </div>
  </div>
  
  <style>
    .todo-card {
      padding: 20px;
      margin: 15px 0;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      cursor: grab;
      transition: box-shadow 0.3s, transform 0.2s;
    }
  
    .todo-card:hover {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      transform: translateY(-4px);
    }
  
    .todo-card:active {
      cursor: grabbing;
    }
  
    .card-content {
      margin-bottom: 20px;
      text-align: left;
    }
  
    .task-title {
      margin: 0;
      font-weight: 700;
      color: #333;
      font-size: 1.5rem;
    }
  
    .description {
      font-size: 1rem;
      color: #555;
      margin-top: 8px;
      line-height: 1.5;
    }
  
    .due-date {
      font-size: 0.9rem;
      color: #888;
      margin-top: 5px;
    }
  
    .priority {
      padding: 6px 12px;
      border-radius: 12px;
      font-size: 0.9em;
      text-transform: capitalize;
      margin-top: 5px;
      display: inline-block;
    }
  
    .priority.low {
      background-color: #d3f9d8;
      color: #28a745;
    }
  
    .priority.medium {
      background-color: #fff3cd;
      color: #ffc107;
    }
  
    .priority.high {
      background-color: #f8d7da;
      color: #dc3545;
    }
  
    .card-actions {
      display: flex;
      justify-content: space-between;
      margin-top: 15px;
      border-top: 1px solid #eee;
      padding-top: 15px;
    }
  
    button {
      background: none;
      border: none;
      cursor: pointer;
      color: #007bff;
      font-size: 1rem;
      transition: color 0.2s, transform 0.2s;
      font-weight: 600;
    }
  
    button:hover {
      color: #0056b3;
      transform: translateY(-1px);
    }
  </style>
  