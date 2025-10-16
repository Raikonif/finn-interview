import { Provider } from "react-redux";
import { HydrationBoundary, QueryClient, QueryClientProvider, type DehydratedState } from "@tanstack/react-query";
import { Toaster } from "sonner";
import ClientOnly from "@/components/ClientOnly";
import { ErrorBoundary } from "react-error-boundary";
import { store } from "@/store/store.ts";
import AppRouter from "@/routers/AppRouter";
import ErrorFallBack from "@/components/ErrorFallback.tsx";
import { useMemo } from "react";

export default function Root() {
  // Create a new QueryClient instance for each request in SSR
  const queryClient = useMemo(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Don't refetch immediately on mount for SSR
        staleTime: 60 * 1000,
        retry: false,
      },
    },
  }), []);

  const dehydratedState = ((): DehydratedState | null => {
    if (typeof window !== 'undefined' &&
      typeof (window as unknown as { __REACT_QUERY_STATE__?: unknown }).__REACT_QUERY_STATE__ !== 'undefined') {
      return (window as unknown as { __REACT_QUERY_STATE__?: DehydratedState | null }).__REACT_QUERY_STATE__ ?? null;
    }
    return null;
  })();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <div className="flex flex-col w-full gap-4">
              <AppRouter />
            </div>
            <ClientOnly>
              <Toaster position="top-right" expand={true} />
            </ClientOnly>
          </ErrorBoundary>
        </HydrationBoundary>
      </QueryClientProvider>
    </Provider>
  );
}
