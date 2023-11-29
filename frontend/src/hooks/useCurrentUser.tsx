import { useEffect, useState } from "react";
import { getCurrentUser } from "../apiFunctions/getCurrentUser";
import { removeJwtToken } from "../auth/JwtToken";
import { useNavigate } from "react-router-dom";
import { checkIfConnectedToUsos } from "../apiFunctions/checkIfConnectedToUsos";

export function useCurrentUser() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<boolean | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [connectedToUsos, setConnectedToUsos] = useState<boolean | undefined>(
    undefined
  );

  useEffect(() => {
    setMounted(true);
    const jwtToken = localStorage.getItem("jwtToken");
    if (!jwtToken) {
      navigate("/login?redirected=true");
    }

    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
        setAuthenticated(true);
      })
      .catch((err) => {
        console.log(err);
        removeJwtToken();
        setAuthenticated(false);
        navigate("/login?redirected=true");
      });
  }, []);

  useEffect(() => {
    if (!authenticated || connectedToUsos) return;
    checkIfConnectedToUsos()
      .then(() => {
        setConnectedToUsos(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setConnectedToUsos(false);
      });
  }, [authenticated, connectedToUsos]);


  return {
    mounted,
    currentUser,
    authenticated,
    loading,
    setAuthenticated,
    setCurrentUser,
    connectedToUsos,
    setConnectedToUsos,
    setLoading,
  };
}
