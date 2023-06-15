"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

type QueryProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const QueryProvider = ({ children }: QueryProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
