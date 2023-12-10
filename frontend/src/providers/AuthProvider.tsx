import { createContext, useContext, useMemo } from "react";
import { useCurrentUser } from "../hooks/useCurrentUser";
import { UserData } from "../models/UserData";

interface AuthProps {
  mounted: boolean;
  authenticated: boolean | undefined;
  currentUser: UserData | undefined;
  setAuthenticated: (value: boolean) => void;
  setCurrentUser: (value: any) => void;
  loading: boolean;
  connectedToUsos: boolean | undefined;
  setConnectedToUsos: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

interface Props {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthProps>({
  mounted: false,
  authenticated: undefined,
  currentUser: undefined,
  setAuthenticated: () => {},
  setCurrentUser: () => {},
  loading: true,
  connectedToUsos: undefined,
  setConnectedToUsos: () => {},
  setLoading: () => {},
});

export function AuthProvider({ children }: Props) {
  const {
    mounted,
    currentUser,
    authenticated,
    loading,
    setAuthenticated,
    setCurrentUser,
    connectedToUsos,
    setConnectedToUsos,
    setLoading,
  } = useCurrentUser();

  const states = useMemo(
    () => ({
      mounted,
      authenticated,
      currentUser,
      loading,
      setAuthenticated,
      setCurrentUser,
      connectedToUsos,
      setConnectedToUsos,
      setLoading,
    }),
    [
      mounted,
      currentUser,
      authenticated,
      loading,
      setAuthenticated,
      setCurrentUser,
      connectedToUsos,
      setConnectedToUsos,
      setLoading,
    ]
  );

  return <AuthContext.Provider value={states}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => useContext(AuthContext);
