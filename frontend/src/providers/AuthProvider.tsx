import { createContext, useContext, useMemo } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";

interface AuthProps {
  mounted: boolean;
  authenticated: boolean;
  currentUser: any;
  setAuthenticated: (value: boolean) => void;
  setCurrentUser: (value: any) => void;
  loading: boolean;
  connectedToUsos: boolean;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthProps>({
  mounted: false,
  authenticated: false,
  currentUser: null,
  setAuthenticated: () => {},
  setCurrentUser: () => {},
  loading: true,
  connectedToUsos: false,
});

export function AuthProvider({ children }: Props) {
  const {
    mounted,
    currentUser,
    authenticated,
    loading,
    setAuthenticated,
    setCurrentUser,
    connectedToUsos
  } = useCurrentUser();

  const states = useMemo(
    () => ({
      mounted,
      authenticated,
      currentUser,
      loading,
      setAuthenticated,
      setCurrentUser,
      connectedToUsos
    }),
    [
      mounted,
      currentUser,
      authenticated,
      loading,
      setAuthenticated,
      setCurrentUser,
      connectedToUsos
    ]
  );

  return <AuthContext.Provider value={states}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
