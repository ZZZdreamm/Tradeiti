import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

const login = "/login?redirected=true";
const usosConnect = "/usos-connect";

// HOC component for rendering page only if user is connected to usos
export const withPrivateRoute = (WrappedComponent: any) => {
  const hocComponent = ({ ...props }) => {
    const navigate = useNavigate();
    const { mounted, authenticated, loading, connectedToUsos } =
      useAuthContext();
    useEffect(() => {
      if (mounted && authenticated === false) {
        navigate(login);
      } else if (mounted && connectedToUsos === false) {
        navigate(usosConnect);
      } else if (
        mounted &&
        authenticated === true &&
        connectedToUsos === true
      ) {
        const path = window.location.pathname;
        if (path.includes(usosConnect) || path.includes("/login")) {
          navigate("/#/");
        }
      }
    }, [authenticated, loading, connectedToUsos]);
    return (
      <>{!loading ? <WrappedComponent {...props} /> : <div>Loading...</div>}</>
    );
  };

  return hocComponent;
};
