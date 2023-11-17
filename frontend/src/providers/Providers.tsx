import React from "react";
import { AuthProvider } from "./AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
interface Props {
  children?: React.ReactNode;
}

const queryClient = new QueryClient();
export function Providers({ children }: Props) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </AuthProvider>
  );
}
