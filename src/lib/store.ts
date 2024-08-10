import { writable } from 'svelte/store';
import { browser } from '$app/environment'; // Import browser environment check

export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: number;
  text: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  status: 'todo' | 'doing' | 'done';
}

// Initialize todos with an empty array or from localStorage if available
const initialTodos: Todo[] = browser
  ? JSON.parse(localStorage.getItem('todos') || '[]')
  : [];

// Define and export the todos and searchQuery stores
export const todos = writable<Todo[]>(initialTodos);
export const searchQuery = writable<string>(''); // Export searchQuery store

// Subscribe to todos store and save changes to localStorage
if (browser) {
  todos.subscribe((value) => {
    localStorage.setItem('todos', JSON.stringify(value));
  });
}

// Updated addTodo function
export function addTodo(details: {
  text: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
}): void {
  todos.update((current) => [
    ...current,
    {
      id: Date.now(),
      text: details.text,
      description: details.description,
      dueDate: details.dueDate,
      priority: details.priority,
      status: 'todo',
    },
  ]);
}

export function updateTodoStatus(id: number, status: 'todo' | 'doing' | 'done'): void {
  todos.update((items) =>
    items.map((todo) => (todo.id === id ? { ...todo, status } : todo))
  );
}

export function updateTodo(id: number, updates: Partial<Todo>): void {
  todos.update((items) =>
    items.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
  );
}

export function removeTodo(id: number): void {
  todos.update((current) => current.filter((todo) => todo.id !== id));
}
