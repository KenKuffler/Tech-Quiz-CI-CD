import express from 'express';
import apiRoutes from './api/index.js';

const router = express.Router();

// API Routes
router.use('/api', apiRoutes);

export default router;

