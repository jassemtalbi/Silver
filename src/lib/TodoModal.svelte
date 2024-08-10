<script lang="ts">
    import { createEventDispatcher } from 'svelte';
  
    const dispatch = createEventDispatcher();
  
    export let taskId: number | null = null;
    export let taskText: string = '';
    export let taskDescription: string = '';
    export let taskDueDate: string = '';
    export let taskPriority: 'low' | 'medium' | 'high' = 'medium';
  
    let newTaskText = taskText;
    let newTaskDescription = taskDescription;
    let newTaskDueDate = taskDueDate;
    let newTaskPriority = taskPriority;
  
    function closeModal() {
      dispatch('close');
    }
  
    function saveTask() {
      if (taskId !== null) {
        // Update task
        dispatch('update', {
          id: taskId,
          text: newTaskText,
          description: newTaskDescription,
          dueDate: newTaskDueDate,
          priority: newTaskPriority
        });
      } else {
        // Add new task
        dispatch('add', {
          text: newTaskText,
          description: newTaskDescription,
          dueDate: newTaskDueDate,
          priority: newTaskPriority
        });
      }
      closeModal();
    }
  </script>
  
  <div class="modal-overlay" on:click={closeModal}>
    <div class="modal-content" on:click|stopPropagation>
      <h3>{taskId !== null ? 'Edit Task' : 'Add New Task'}</h3>
      <input
        type="text"
        placeholder="Task title"
        bind:value={newTaskText}
        required
        aria-label="Task title"
      />
      <textarea
        placeholder="Description"
        bind:value={newTaskDescription}
        aria-label="Description"
      ></textarea>
      <input
        type="date"
        bind:value={newTaskDueDate}
        aria-label="Due date"
      />
      <select bind:value={newTaskPriority} aria-label="Priority">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <div class="modal-actions">
        <button on:click={saveTask}>{taskId !== null ? 'Update Task' : 'Add Task'}</button>
        <button on:click={closeModal}>Cancel</button>
      </div>
    </div>
  </div>
  
  <style>
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }
  
    .modal-content {
      background-color: #fff;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    }
  
    h3 {
      margin: 0 0 10px 0;
      color: var(--heading-color);
    }
  
    input[type='text'],
    input[type='date'],
    textarea,
    select {
      width: 100%;
      padding: 8px;
      margin-top: 4px;
      border-radius: 4px;
      border: 1px solid #ddd;
      box-sizing: border-box;
      background-color: #fff;
    }
  
    textarea {
      height: 80px;
      resize: vertical;
    }
  
    .modal-actions {
      text-align: right;
      margin-top: 20px;
    }
  
    .modal-actions button {
      padding: 8px 16px;
      margin-left: 10px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      background-color: #007bff;
      color: #fff;
      transition: background-color 0.3s;
    }
  
    .modal-actions button:hover {
      background-color: #0056b3;
    }
  </style>
  