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

// Serve static files from the React frontend app
const clientDistPath = path.resolve(__dirname, '../client/dist');
app.use(express.static(clientDistPath));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use('/api', routes);

// Catch-all route to serve React's index.html
app.get('*', (req, res) => {
   if (req.path.startsWith('/api')) {
      res.status(404).json({ error: 'API route not found' });
   } else {
      res.sendFile(path.join(clientDistPath, 'index.html'));
   }
});

// Start the server once the database connection is open
db.once('open', () => {
   app.listen(PORT, () => console.log(`🌍 Now listening on http://localhost:${PORT}`));
});



