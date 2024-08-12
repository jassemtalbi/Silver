import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { mockDatabase } from '$lib/mockDatabase'; // mock database

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    const user = mockDatabase.users.find((user) => user.email === email);
    if (!user) {
      console.log('Login attempt for non-existent user:', email); 
      return new Response(JSON.stringify({ error: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) {
      return new Response(JSON.stringify({ error: 'Invalid password' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const sessionToken = `mock-token-for-${email}`;

    return new Response(
      JSON.stringify({ message: 'Login successful', user: { email }, token: sessionToken }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Login failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
