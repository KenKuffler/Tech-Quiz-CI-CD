import express from 'express';
import path from 'path';
import db from './config/connection.js';
import routes from './routes/index.js';
import { fileURLToPath } from 'url';

const app = express();
const PORT = process.env.PORT || 3001;

// Resolve __dirname for ESModules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the React frontend app
app.use(express.static(path.resolve(__dirname, '../client/dist')));

// API routes
app.use('/api', routes);

// Catch-all route to serve React's index.html for frontend routing
app.get('*', (_req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/index.html'));
});

// Start the server once the database connection is open
db.once('open', () => {
  app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
});

