import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
    root: path.join(__dirname, '..', 'client'),
    base: '/',
  });

  // Use vite's connect instance as middleware
  app.use(vite.ssrFixStacktrace);
  
  // Serve generated images
  app.use('/api/assets', express.static(path.join(__dirname, '..', 'attached_assets')));
  
  app.use(vite.middlewares);

  const port = process.env.PORT || 5000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
  });
}

createServer();