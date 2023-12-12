import { useNavigate } from "react-router-dom";
import { connectUsos } from "../../apiFunctions/connectUsos";
import { removeJwtToken } from "../../auth/JwtToken";
import "./UsosConnect.scss";

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
      <h1>Połącz z USOS</h1>
      <img src="/plug.png" alt="plug" width="200px"/>
      <br />
      <button className = "usosButton" onClick={getToken}>Połącz konto</button>
    </div>
  );
}
