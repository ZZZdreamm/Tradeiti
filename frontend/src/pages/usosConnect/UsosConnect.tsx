import { useNavigate } from "react-router-dom";
import { connectUsos } from "../../apiFunctions/connectUsos";
import { removeJwtToken } from "../../auth/JwtToken";

export function UsosConnect() {
  const navigate = useNavigate();
  const getToken = async () => {
    connectUsos()
      .then((response) => {
        window.location.href = response;
      })
      .catch(() => {
        removeJwtToken();
        navigate("/login?redirected=true");
      });
  };
  return (
    <div>
      <h1>UsosConnect</h1>
      <button onClick={getToken}>Connect account to USOS</button>
    </div>
  );
}
