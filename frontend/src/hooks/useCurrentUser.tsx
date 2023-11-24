import { useEffect, useState } from "react";
import { axiosBase } from "../config/axiosConfig";
import { ACCESS_TOKEN } from "../config/constants";
import { getCurrentUser } from "../apiFunctions/getCurrentUser";
import { removeAccessToken } from "../auth/JwtToken";
import { useNavigate } from "react-router-dom";

export function useCurrentUser() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [connectedToUsos, setConnectedToUsos] = useState<boolean | undefined>();

  useEffect(() => {
    setMounted(true);
    const jwtToken = localStorage.getItem("jwtToken");
    setAuthenticated(jwtToken ? true : false);

    if (!jwtToken) {
      navigate("/login?redirected=true");
    }
    if (authenticated) {
      getCurrentUser()
        .then((user) => {
          setCurrentUser(user);
          setConnectedToUsos(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          removeAccessToken();
          setLoading(false);
        });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!authenticated && !currentUser) return;
    axiosBase.interceptors.request.use((config) => {
      config.headers["Authorization"] = `Bearer ${localStorage.getItem(
        ACCESS_TOKEN
      )}`;
      return config;
    });
  }, [authenticated, currentUser]);

  return {
    mounted,
    currentUser,
    authenticated,
    loading,
    setAuthenticated,
    setCurrentUser,
    connectedToUsos,
  };
}
