import { removeJwtToken } from "../../auth/JwtToken";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import "./TopBar.scss";

export const TopBar = () => {
  const { authenticated } = useAuthContext();
  const navigate = useNavigate();
  const logout = () => {
    removeJwtToken();
    window.location.reload();
  };
  return (
    <>
      <div className="topBar">
        <span>
          <b>Politechnikum Warszawskie</b> - Poboczny system uwierzytelniania
        </span>
        <span>
          <a onClick={() => navigate('userPage')}><b>Mój profil</b></a> | 🏴‍☠️ |{" "}
          {authenticated ? (
            <a className="logout" onClick={logout}>
              Wyloguj się
            </a>
          ) : (
            <a href="/login">Zaloguj się</a>
          )}
        </span>
      </div>
    </>
  );
};
