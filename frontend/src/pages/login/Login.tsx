import "./style.scss";
import { Image } from "../../common/image/Image";
// import { getRequestToken } from "../../apiFunctions/login";
import { AuthForm } from "../../components/authForm/AuthForm";
import { UserCredentials } from "../../models/UserCredentials";
import { login } from "../../apiFunctions/login";
import { saveToken } from "../../auth/JwtToken";
import { useState } from "react";
import { checkIfConnectedToUsos } from "../../apiFunctions/checkIfConnectedToUsos";
import { useAuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoading, setConnectedToUsos, setAuthenticated } = useAuthContext();

  const handleLogin = async (userCredentials: UserCredentials) => {
    login(userCredentials)
      .then((response) => {
        if (response.token) {
          saveToken(response.token);
          setAuthenticated(true);
          checkIfConnectedToUsos()
            .then(() => {
              setConnectedToUsos(true);
              setLoading(false);
              localStorage.setItem("username", userCredentials.username);
              navigate("/#/");
              window.location.reload();
            })
            .catch((err) => {
              console.log(err);
              setConnectedToUsos(false);
              navigate("/#/usos-connect");
              window.location.reload();
            });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 503) {
          setErrorMessage("Komputer Artura zasypał śnieg.");
        } else if (err.response && err.response.status === 403) {
          setErrorMessage("Login lub hasło niepoprawne.");
        } else {
          setErrorMessage("Błąd logowania.");
        }
      });
  };

  return (
    <article className="login">
      <Image src="TradeEITI.png" />
      <div className="formDiv">
        <h2>Login</h2>
        <AuthForm handleOnSubmit={handleLogin} errorMessage={errorMessage} />
        <button
          className="regButton"
          onClick={() => (window.location.href = "/#/register")}
        >
          Zarejestruj się
        </button>
      </div>
    </article>
  );
};
