# SSR Implementation Guide

## Overview
This project implements Server-Side Rendering (SSR) using React, Vite, and Express to provide better SEO, faster initial page loads, and improved user experience.

## 🎯 SSR-Enabled Pages

### ✅ Fully SSR-Rendered Pages:
- **Home (`/`)** - Static hero section with features
- **About (`/about`)** - Static informational content about the application

### 🔄 Hybrid Rendering Pages:
- **Login (`/login`)** - Form rendered on server, authentication on client
- **Items (`/items`)** - Structure rendered on server, data fetched on client

## 📁 Key Files

### Entry Points
- **`src/entry-server.tsx`** - Server-side entry point
  - Uses `renderToString` to convert React components to HTML
  - Implements async rendering with React Query state dehydration
  - Handles route-based data prefetching

- **`src/main.tsx`** - Client-side entry point
  - Uses `hydrateRoot` to attach to server-rendered HTML
  - Takes over interactivity after initial render

### Server Files
- **`server.mjs`** / **`server.ts`** - Express server
  - Handles SSR in both development and production modes
  - In dev: Uses Vite's middleware for hot module replacement
  - In prod: Serves pre-built static files and SSR bundle

### SSR Components
- **`src/RootServer.tsx`** - Server-side root component
  - Uses `StaticRouter` for server-side routing
  - Includes Redux Provider and React Query setup
  - Supports state hydration via `HydrationBoundary`

### Configuration
- **`vite.server.config.ts`** - SSR build configuration
  - Builds server bundle separately
  - Outputs to `dist/server` directory

## 🚀 Running the Application

### Development Mode (SSR)
```bash
npm run dev
# or
pnpm dev
```
Runs on `http://localhost:5173` with full SSR and hot reload.

### Development Mode (Client-Side Only)
```bash
npm run dev:csr
# or
pnpm dev:csr
```
Runs Vite dev server without SSR for faster development.

### Production Build
```bash
npm run build
# or
pnpm build
```
Creates optimized bundles:
- `dist/client` - Client-side bundle
- `dist/server` - Server-side bundle

### Production Server
```bash
npm run serve
# or
pnpm serve
```
Runs production server with SSR enabled.

## 🔧 How SSR Works

### Request Flow:
```
1. Browser Request → Express Server
2. Express loads entry-server.tsx
3. entry-server.tsx renders React to HTML string
4. React Query state is dehydrated
5. HTML injected into index.html at <!--ssr-outlet-->
6. Server sends complete HTML to browser
7. Browser displays content immediately
8. JavaScript loads and hydrateRoot() takes over
9. App becomes fully interactive
```

### SSR Rendering Process:
```typescript
// Server (entry-server.tsx)
export async function render(url: string) {
  const queryClient = new QueryClient();
  
  // Prefetch data based on route
  if (url === '/') {
    console.log('[SSR] Rendering Home page');
  }
  
  const dehydratedState = dehydrate(queryClient);
  const html = renderToString(
    <RootServer url={url} dehydratedState={dehydratedState} />
  );
  
  return html;
}
```

## 🛡️ SSR-Safe Utilities

### Storage Wrapper (`src/utils/storage.ts`)
Prevents errors when accessing localStorage during SSR:
```typescript
export const isServer = typeof window === 'undefined';

export const storage = {
  getItem: (key: string) => {
    if (isServer) return null;
    return localStorage.getItem(key);
  },
  // ... other methods
};
```

### ClientOnly Component (`src/components/ClientOnly.tsx`)
For components that must only render on client:
```tsx
import ClientOnly from '@/components/ClientOnly';

<ClientOnly>
  <BrowserOnlyComponent />
</ClientOnly>
```

## 📊 Benefits of SSR Implementation

### SEO Benefits:
- ✅ Search engines can crawl full content
- ✅ Meta tags are rendered server-side
- ✅ Social media previews work correctly

### Performance Benefits:
- ✅ Faster First Contentful Paint (FCP)
- ✅ Faster Largest Contentful Paint (LCP)
- ✅ Better perceived performance
- ✅ Content visible before JavaScript loads

### User Experience:
- ✅ No loading spinners on initial page load
- ✅ Progressive enhancement
- ✅ Works even with slow JavaScript execution

## 🧪 Testing SSR

### Verify SSR is Working:
1. Start the dev server: `npm run dev`
2. Open `http://localhost:5173` in browser
3. Right-click → View Page Source
4. You should see rendered HTML content (not just empty `<div id="root">`)

### Check Network:
- Disable JavaScript in browser
- Navigate to `/` or `/about`
- Content should still be visible (without interactivity)

## 🔍 Debug Logging

The server logs SSR operations:
```
[SSR] Rendering Home page
[SSR] Rendering About page
[SSR] Prefetching Items data
```

Check console for these logs when pages are rendered.

## 🚧 Future Enhancements

### Possible Improvements:
1. **Data Prefetching for Items Page**
   - Fetch user data on server before rendering
   - Pass to client via dehydrated state

2. **Dynamic Meta Tags**
   - Generate page-specific meta tags on server
   - Improve SEO for dynamic pages

3. **Streaming SSR**
   - Use `renderToPipeableStream` for faster TTFB
   - Stream content as it's rendered

4. **Edge SSR**
   - Deploy to edge functions (Cloudflare Workers, Vercel Edge)
   - Reduce latency with global distribution

## 📝 Notes

- Home and About pages are fully static and render completely on the server
- Login page renders structure on server, handles auth on client
- Items page requires authentication, so data fetching stays client-side
- All pages use hydration to become interactive after initial render

## 🤝 Contributing

When adding new pages:
1. Ensure no direct `window` or `document` access during render
2. Use `storage` wrapper for localStorage
3. Wrap browser-only components in `<ClientOnly>`
4. Add route-specific prefetching in `entry-server.tsx` if needed
5. Test with JavaScript disabled to verify SSR

---

**Built with ❤️ for Finconecta Assessment**
