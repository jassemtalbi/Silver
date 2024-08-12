import type { RequestHandler } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import { mockDatabase } from '$lib/mockDatabase'; 

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { email, password } = await request.json();

    if (mockDatabase.users.find((user) => user.email === email)) {
      return new Response(JSON.stringify({ error: 'User already exists' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    mockDatabase.users.push({ email, passwordHash });

    console.log('Users after signup:', mockDatabase.users); 

    return new Response(JSON.stringify({ message: 'User created successfully' }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create user' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
