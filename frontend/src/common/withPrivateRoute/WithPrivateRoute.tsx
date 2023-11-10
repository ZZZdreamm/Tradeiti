import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

const login = "/login?redirected=true";

export const withPrivateRoute = (WrappedComponent: any) => {
  const hocComponent = ({ ...props }) => {
    const navigate = useNavigate();
    const { mounted, authenticated, loading } = useAuthContext();
    useEffect(() => {
      if (mounted && !authenticated) {
        navigate(login);
      }
    }, [authenticated, loading]);
    return (
      <>{!loading ? <WrappedComponent {...props} /> : <div>Loading...</div>}</>
    );
  };

  return hocComponent;
};
