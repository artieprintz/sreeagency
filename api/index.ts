import type { VercelRequest, VercelResponse } from '@vercel/node';
import { app } from '../server';

// Vercel forwards /api/* requests to this Express app.
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
