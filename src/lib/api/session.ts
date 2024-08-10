import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ request }) => {
  // Simulate session extraction
  const isAuthenticated = request.headers.get('cookie')?.includes('authenticated=true');
  const session = isAuthenticated ? { user: { id: '1', name: 'Test User' } } : {};

  return json(session);
};
