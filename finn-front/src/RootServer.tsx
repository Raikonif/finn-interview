import { StaticRouter } from 'react-router-dom/server';
import { Provider } from 'react-redux';
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from '@/store/store';
import AppRouter from '@/routers/AppRouter';
import ErrorFallBack from '@/components/ErrorFallback';

interface Props {
  url: string;
  dehydratedState?: DehydratedState | null;
}

export default function RootServer({ url, dehydratedState = null }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60 * 1000, retry: false } },
  });

  return (
    <StaticRouter location={url}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <HydrationBoundary state={dehydratedState}>
            <ErrorBoundary FallbackComponent={ErrorFallBack}>
              <div className="flex flex-col w-full gap-4">
                <AppRouter />
              </div>
            </ErrorBoundary>
          </HydrationBoundary>
        </QueryClientProvider>
      </Provider>
    </StaticRouter>
  );
}
