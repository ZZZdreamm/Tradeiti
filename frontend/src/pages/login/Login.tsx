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

export const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { setLoading, setConnectedToUsos } = useAuthContext();

  const handleLogin = async (userCredentials: UserCredentials) => {
    login(userCredentials)
      .then((response) => {
        if (response.token) {
          saveToken(response.token);
          checkIfConnectedToUsos()
            .then(() => {
              setConnectedToUsos(true);
              setLoading(false);
              window.location.href = "/#/";
            })
            .catch((err) => {
              console.log(err);
              setConnectedToUsos(false);
              window.location.href = "/#/usos-connect";
            });
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 503) {
          setErrorMessage("Komputer Artura zasypał śnieg.");
          window.alert("Service Unavailable. Please try again later.");
          window.location.reload();
        } else if (err.response && err.response.status === 409) {
          setErrorMessage("Username already exists.");
        } else {
          setErrorMessage("Unidentified error occured.");
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
