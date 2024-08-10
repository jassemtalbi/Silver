<script lang="ts">
	import { goto } from '$app/navigation';
	import { login } from '$lib/stores/session';
  
	let email = '';
	let password = '';
	let errorMessage = '';
  
	async function handleSignIn(event: Event) {
	  event.preventDefault();
	  try {
		await login(email, password);
		goto('/tasks'); // Redirect to the tasks page upon successful login
	  } catch (error) {
		errorMessage = 'Login failed. Please check your credentials and try again.';
	  }
	}
  </script>
  
  <main class="auth-container">
	<div class="auth-box">
	  <h1>Sign In</h1>
	  <form on:submit={handleSignIn}>
		<input type="email" placeholder="Email" bind:value={email} required />
		<input type="password" placeholder="Password" bind:value={password} required />
		{#if errorMessage}
		  <p class="error-message">{errorMessage}</p>
		{/if}
		<button type="submit">Sign In</button>
	  </form>
	</div>
  </main>
  
  <style>
	.auth-container {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 100vh;
	  background: linear-gradient(135deg, #f5f7fa, #cfd8dc);
	}
  
	.auth-box {
	  background-color: #fff;
	  padding: 40px;
	  border-radius: 10px;
	  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
	  width: 400px;
	  text-align: center;
	}
  
	h1 {
	  font-size: 2rem;
	  margin-bottom: 30px;
	  color: #333;
	}
  
	form {
	  display: flex;
	  flex-direction: column;
	  gap: 20px;
	}
  
	input {
	  padding: 12px;
	  border: 1px solid #ddd;
	  border-radius: 5px;
	  font-size: 1rem;
	  width: 100%;
	  box-sizing: border-box;
	}
  
	.error-message {
	  color: #ff4d4d;
	  font-size: 0.9rem;
	}
  
	button {
	  padding: 12px;
	  background-color: #007bff;
	  color: #fff;
	  border: none;
	  border-radius: 5px;
	  cursor: pointer;
	  font-size: 1rem;
	  font-weight: bold;
	  transition: background-color 0.3s;
	}
  
	button:hover {
	  background-color: #0056b3;
	}
  </style>
  