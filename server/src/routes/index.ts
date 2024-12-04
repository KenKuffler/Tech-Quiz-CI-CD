import type { Request, Response } from 'express';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './api/index.js';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// API Routes
router.use('/api', apiRoutes);

// Serve React frontend for non-API routes
router.use('*', (_req: Request, res: Response) => {
  const clientDistPath = path.join(__dirname, '../../../../client/dist');
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

export default router;

