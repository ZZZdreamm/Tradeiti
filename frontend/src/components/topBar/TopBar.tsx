import { removeJwtToken } from "../../auth/JwtToken";
import { useAuthContext } from "../../providers/AuthProvider";
import "./TopBar.scss";

export const TopBar = () => {
  const { authenticated } = useAuthContext();
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
          Status zalogowania | 🏴‍☠️ |{" "}
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
