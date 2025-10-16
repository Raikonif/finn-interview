import { renderToString } from 'react-dom/server';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import RootServer from './RootServer';

export async function render(url: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  });

  // Prefetch data based on route for full SSR
  try {
    // Home page - could prefetch stats or featured content
    if (url === '/' || url === '/home') {
      // Static page - no data to prefetch, but queryClient is ready
      console.log('[SSR] Rendering Home page');
    }
    
    // About page - static content
    if (url.includes('/about')) {
      // Static page - no data to prefetch
      console.log('[SSR] Rendering About page');
    }

    // Items page - prefetch users data
    if (url.includes('/items')) {
      console.log('[SSR] Prefetching Items data');
      // Note: This would require making the API call work in Node.js environment
      // For now, we're setting up the infrastructure
    }
  } catch (error) {
    console.error('[SSR] Error during data prefetch:', error);
  }

  // Dehydrate the state to pass to client
  const dehydratedState = dehydrate(queryClient);

  // Render with dehydrated state
  const html = renderToString(
    <RootServer url={url} dehydratedState={dehydratedState} />
  );

  return html;
}
