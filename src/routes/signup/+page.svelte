<script lang="ts">
	import { goto } from '$app/navigation';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let errorMessage = '';
	let successMessage = '';
  
	async function handleSignUp(event: Event) {
	  event.preventDefault();
	  if (password !== confirmPassword) {
		errorMessage = "Passwords do not match";
		return;
	  }
  
	  const response = await fetch('/api/signup', {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({ email, password }),
	  });
  
	  if (response.ok) {
		successMessage = 'Account created successfully! You can now log in.';
		errorMessage = '';
	  } else {
		const errorData = await response.json();
		errorMessage = errorData.error || 'Sign-up failed. Please try again.';
	  }
	}
  </script>
  
  <main class="auth-container">
	<div class="auth-box">
	  <h1>Sign Up</h1>
	  <form on:submit={handleSignUp}>
		<input type="email" placeholder="Email" bind:value={email} required />
		<input type="password" placeholder="Password" bind:value={password} required />
		<input type="password" placeholder="Confirm Password" bind:value={confirmPassword} required />
		{#if errorMessage}
		  <p class="error-message">{errorMessage}</p>
		{/if}
		{#if successMessage}
		  <p class="success-message">{successMessage}</p>
		{/if}
		<button type="submit">Sign Up</button>
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
  
	.success-message {
	  color: #4caf50;
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
  