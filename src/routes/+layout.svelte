<script context="module" lang="ts">
  import type { Load } from '@sveltejs/kit';

  type User = {
   email:string;
  };

  type SessionUser = {
    user?: User;
  };

  export const load: Load = async ({ fetch }) => {
    const response = await fetch('/api/session');
    const data: SessionUser = await response.json();

    return {
      props: {
        session: data,
      },
    };
  };
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { session, logout } from '$lib/stores/session';
  import { writable } from 'svelte/store';

  let currentSession: SessionUser;
  const isMenuOpen = writable(false);

  session.subscribe((value) => {
    currentSession = value;
  });

  onMount(() => {
    if (!currentSession.user && $page.url.pathname !== '/signin' && $page.url.pathname !== '/signup') {
      window.location.href = '/signin';
    }
  });

  function handleLogout() {
    logout();
    window.location.href = '/signin';
  }

  function toggleMenu() {
    isMenuOpen.update((value) => !value);
  }
</script>

<nav class="navbar">
  <div class="container">
    <a href="/" class="brand">Silver smok</a>
    <button class="menu-toggle" on:click={toggleMenu} aria-label="Toggle menu">☰</button>
    <ul class="nav-links" class:active={$isMenuOpen}>
      {#if !currentSession.user}

      <li><a href="/signin" class:active={$page.url.pathname === '/signin'}>Sign In</a></li>
      <li><a href="/signup" class:active={$page.url.pathname === '/signup'}>Sign Up</a></li>
      {/if}

      {#if currentSession.user}
        <li class="user-links">
          <a href="/tasks" class:active={$page.url.pathname === '/tasks'}>Tasks</a>
          <button class="logout-button" on:click={handleLogout}>Logout</button>
        </li>
      {/if}
    </ul>
  </div>
</nav>

<slot />

<style>
  :global(body) {
    margin: 0;
    font-family: 'Inter', sans-serif;
    background-color: #f5f5f5;
  }

  .navbar {
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 15px 0;
    position: sticky;
    top: 0;
    z-index: 1000;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
  }

  .navbar:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .brand {
    font-size: 1.8rem;
    font-weight: bold;
    color: #333;
    text-decoration: none;
    transition: color 0.3s ease;
  }

  .brand:hover {
    color: #007bff;
  }

  .nav-links {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 30px;
    margin: 0;
    padding: 0;
    transition: max-height 0.3s ease;
  }

  .nav-links a,
  .nav-links button {
    font-size: 1rem;
    color: #333;
    text-decoration: none;
    padding: 10px 20px;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s, transform 0.2s;
    background: none;
    border: none;
    cursor: pointer;
  }

  .nav-links a:hover,
  .nav-links button:hover {
    background-color: #007bff;
    color: #fff;
    transform: translateY(-2px);
  }

  .nav-links a.active {
    background-color: #0056b3;
    color: #fff;
  }

  .menu-toggle {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #333;
  }

  .logout-button {
    color: #333;
    background-color: transparent;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }

  .logout-button:hover {
    background-color: #ff4d4d;
    color: white;
  }

  .user-links {
    display: flex;
    gap: 10px; /* Ensure proper spacing between Tasks and Logout */
  }

  @media (max-width: 768px) {
    .nav-links {
      flex-direction: column;
      gap: 10px;
      background-color: #ffffff;
      padding: 10px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      position: absolute;
      right: 20px;
      top: 60px;
      border-radius: 5px;
      max-height: 0;
      overflow: hidden;
    }

    .nav-links.active {
      max-height: 300px; /* Adjust based on content */
    }

    .menu-toggle {
      display: block;
    }
  }

  @media (min-width: 769px) {
    .menu-toggle {
      display: none;
    }
  }
</style>
