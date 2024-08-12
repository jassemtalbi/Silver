import { writable } from 'svelte/store';

type Session = {
  user?: {
    email: string;
  };
  token?: string; 
};

export const session = writable<Session>({});

// Load session from localStorage if available
if (typeof window !== 'undefined') {
  const storedSession = localStorage.getItem('session');
  if (storedSession) {
    session.set(JSON.parse(storedSession));
  }
}

// Simulate login and logout functions
export async function login(email: string, password: string) {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (response.ok) {
    const userSession = await response.json();
    session.set(userSession);
    localStorage.setItem('session', JSON.stringify(userSession));
  } else {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Invalid credentials');
  }
}

export function logout() {
  session.set({});
  localStorage.removeItem('session');
}
