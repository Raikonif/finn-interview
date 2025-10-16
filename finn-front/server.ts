import express from 'express';
import compression from 'compression';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;

const app = express();

// Compression middleware
app.use(compression());

if (isProduction) {
  // Serve static files from dist/client in production
  app.use(express.static(resolve(__dirname, 'dist/client'), { index: false }));
} else {
  // In dev mode, vite dev server will handle static files
  const { createServer: createViteServer } = await import('vite');
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'custom',
  });
  app.use(vite.middlewares);
}

app.use('*', async (req, res) => {
  const url = req.originalUrl;

  try {
    let template: string;
    let render: (url: string) => Promise<string>;

    if (!isProduction) {
      // Load fresh template and module in dev
      const vite = (res as Express.Response & { locals: { vite: any } }).locals.vite;
      template = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
    } else {
      // Use pre-built template and module in production
      template = readFileSync(resolve(__dirname, 'dist/client/index.html'), 'utf-8');
      render = (await import('./dist/server/entry-server.js')).render;
    }

    // Await render since it's now async
    const appHtml = await render(url);

    const html = template.replace(`<!--ssr-outlet-->`, appHtml);

    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    const error = e as Error;
    if (!isProduction) {
      const vite = (res as Express.Response & { locals: { vite: any } }).locals.vite;
      vite?.ssrFixStacktrace(error);
    }
    console.error(error.stack);
    res.status(500).end(error.stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
