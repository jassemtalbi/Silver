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

const initialTodos: Todo[] = browser
  ? JSON.parse(localStorage.getItem('todos') || '[]')
  : [];

export const todos = writable<Todo[]>(initialTodos);
export const searchQuery = writable<string>(''); 

if (browser) {
  todos.subscribe((value) => {
    localStorage.setItem('todos', JSON.stringify(value));
  });
}

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
