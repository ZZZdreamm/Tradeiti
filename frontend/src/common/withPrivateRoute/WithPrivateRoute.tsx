import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

const login = "/login?redirected=true";
const usosConnect = "/usos-connect";

export const withPrivateRoute = (WrappedComponent: any) => {
  const hocComponent = ({ ...props }) => {
    const navigate = useNavigate();
    const { mounted, authenticated, loading, connectedToUsos } =
      useAuthContext();
    useEffect(() => {
      if (mounted && !authenticated) {
        navigate(login);
      } else if (mounted && connectedToUsos === false) {
        navigate(usosConnect);
      }
    }, [authenticated, loading, connectedToUsos]);
    return (
      <>{!loading ? <WrappedComponent {...props} /> : <div>Loading...</div>}</>
    );
  };

  return hocComponent;
};
