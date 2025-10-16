import express from 'express';
import compression from 'compression';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 5173;

const app = express();

app.use(compression());

let vite;
if (!isProduction) {
  const { createServer: createViteServer } = await import('vite');
  vite = await createViteServer({ server: { middlewareMode: true }, appType: 'custom' });
  app.use(vite.middlewares);
} else {
  app.use(express.static(resolve(__dirname, 'dist/client'), { index: false }));
}

app.use(async (req, res) => {
  const url = req.originalUrl;

  try {
    let template;
    let render;

    if (!isProduction) {
      template = readFileSync(resolve(__dirname, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      ({ render } = await vite.ssrLoadModule('/src/entry-server.tsx'));
    } else {
      template = readFileSync(resolve(__dirname, 'dist/client/index.html'), 'utf-8');
      ({ render } = await import('./dist/server/entry-server.js'));
    }

    // Await render since it's now async
    const appHtml = await render(url);
    const html = template.replace('<!--ssr-outlet-->', appHtml);
    res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
  } catch (e) {
    const err = e instanceof Error ? e : new Error(String(e));
    if (!isProduction && vite) vite.ssrFixStacktrace(err);
    console.error(err.stack);
    res.status(500).end(err.stack);
  }
});

app.listen(port, () => {
  console.log(`SSR server running at http://localhost:${port}`);
});
