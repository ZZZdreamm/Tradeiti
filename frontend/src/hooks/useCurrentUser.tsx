import { useEffect, useState } from "react";
import { getCurrentUser } from "../apiFunctions/getCurrentUser";
import { removeJwtToken } from "../auth/JwtToken";
import { useNavigate } from "react-router-dom";
import { checkIfConnectedToUsos } from "../apiFunctions/checkIfConnectedToUsos";
import { getUserData } from "../apiFunctions/getUserData";
import { UserData } from "../models/UserData";

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
      .then(() => {
        // setCurrentUser(userData);
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

  useEffect(() => {
    if (!connectedToUsos) return;
    getUserData().then((userData: UserData) => {
      const user: UserData = {
        username: localStorage.getItem("username")!,
        avatar: userData.avatar,
      };
      setCurrentUser(user);
      setLoading(false);
    });
  }, [connectedToUsos]);

  // Poprawie to później

  // useEffect(() => {
  //   if (!authenticated) return;
  //   axiosBase.interceptors.request.use((config) => {
  //     if (!config.headers.Authorization) {
  //       config.headers.Authorization =
  //         "Bearer " + localStorage.getItem(JWT_TOKEN);
  //     }
  //     return config;
  //   });
  // }, [authenticated]);

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
