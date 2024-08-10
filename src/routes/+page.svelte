<script lang="ts">
	import TodoColumn from '$lib/TodoColumn.svelte';
	import TodoSearch from '$lib/TodoSearch.svelte';
	import TodoModal from '$lib/TodoModal.svelte';
	import { todos, addTodo, updateTodo, removeTodo } from '$lib/store';
	import { get } from 'svelte/store';
  
	let showModal = false;
	let editingTaskId: number | null = null;
	let editingTaskText = '';
	let editingTaskDescription = '';
	let editingTaskDueDate = '';
	let editingTaskPriority: 'low' | 'medium' | 'high' = 'medium';
  
	function openModalForNewTask() {
	  editingTaskId = null;
	  editingTaskText = '';
	  editingTaskDescription = '';
	  editingTaskDueDate = '';
	  editingTaskPriority = 'medium';
	  showModal = true;
	}
  
	function openModalForEdit(id: number) {
	  const task = get(todos).find((todo) => todo.id === id);
	  if (task) {
		editingTaskId = task.id;
		editingTaskText = task.text;
		editingTaskDescription = task.description || '';
		editingTaskDueDate = task.dueDate || '';
		editingTaskPriority = task.priority;
		showModal = true;
	  }
	}
  
	function closeModal() {
	  showModal = false;
	}
  
	function handleAddTask(event: CustomEvent) {
	  const { text, description, dueDate, priority } = event.detail;
	  addTodo({
		text,
		description,
		dueDate,
		priority
	  });
	  closeModal();
	}
  
	function handleUpdateTask(event: CustomEvent) {
	  const { id, text, description, dueDate, priority } = event.detail;
	  updateTodo(id, {
		text,
		description,
		dueDate,
		priority
	  });
	  closeModal();
	}
  
	function handleRemoveTask(id: number) {
	  removeTodo(id);
	}
  </script>
  
  <main>
	<h1>Task Management</h1>
	<TodoSearch />
  
	<button class="add-task-button" on:click={openModalForNewTask}>Add New Task</button>
  
	{#if showModal}
	  <TodoModal
		taskId={editingTaskId}
		taskText={editingTaskText}
		taskDescription={editingTaskDescription}
		taskDueDate={editingTaskDueDate}
		taskPriority={editingTaskPriority}
		on:close={closeModal}
		on:add={handleAddTask}
		on:update={handleUpdateTask}
	  />
	{/if}
  
	<div class="columns">
	  <TodoColumn status="todo" title="To Do" onEdit={openModalForEdit} onRemove={handleRemoveTask} />
	  <TodoColumn status="doing" title="Doing" onEdit={openModalForEdit} onRemove={handleRemoveTask} />
	  <TodoColumn status="done" title="Done" onEdit={openModalForEdit} onRemove={handleRemoveTask} />
	</div>
  </main>
  
  <style>
	main {
	  padding: 40px 20px;
	  max-width: 1400px;
	  margin: 0 auto;
	  text-align: center;
	  background-color: #f5f7fa;
	  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	  color: #4a4a4a;
	}
  
	h1 {
	  color: #333;
	  margin-bottom: 30px;
	  font-size: 2.8rem;
	  font-weight: 700;
	  border-bottom: 3px solid #e2e2e2;
	  padding-bottom: 10px;
	  text-transform: uppercase;
	  letter-spacing: 2px;
	}
  
	.add-task-button {
	  margin-bottom: 30px;
	  padding: 15px 30px;
	  border: none;
	  border-radius: 8px;
	  background-color: #007bff;
	  color: #fff;
	  cursor: pointer;
	  transition: background-color 0.3s, transform 0.2s;
	  font-size: 1.1rem;
	  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
	}
  
	.add-task-button:hover {
	  background-color: #0056b3;
	  transform: translateY(-3px);
	  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
	}
  
	.columns {
	  display: flex;
	  gap: 40px;
	  justify-content: space-between;
	  align-items: flex-start;
	}
  </style>
  