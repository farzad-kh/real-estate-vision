"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const QueryProvider = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        retry:2,
        refetchOnWindowFocus:false
      }
    }
  })
  return (
    <QueryClientProvider  client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
