import type { Request, Response } from 'express';
import { app } from '../server';

// Vercel forwards /api/* requests to this Express app.
export default function handler(req: Request, res: Response) {
  return app(req, res);
}
