import React from "react";
import { AuthProvider } from "./AuthProvider";
interface Props {
  children?: React.ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
