import "./style.scss";
import { Image } from "../../common/image/Image";
import { AuthForm } from "../../components/authForm/AuthForm";
import { register } from "../../apiFunctions/register";
import { UserCredentials } from "../../models/UserCredentials";
import { saveToken } from "../../auth/JwtToken";
import { useState } from "react";

export const Register = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = async (userCredentials: UserCredentials) => {
    register(userCredentials)
      .then((response) => {
        console.log(response);
        if (response.token) {
          saveToken(response.token);
          localStorage.setItem("username", userCredentials.username);
          window.location.href = "/#/usos-connect";
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 503) {
          setErrorMessage("Komputer Artura zasypał śnieg.");
        } else if (err.response && err.response.status === 409) {
          setErrorMessage("Nazwa użytkownika jest zajęta.");
        } else {
          setErrorMessage("Błąd rejestracji.");
        }
      });
  };

  return (
    <article className="login">
      <Image src="TradeEITI.png" />
      <br></br>
      <div className="formDiv">
        <h2>Rejestracja</h2>
        <AuthForm handleOnSubmit={handleRegister} errorMessage={errorMessage} />
        <button
          className="regButton"
          onClick={() => (window.location.href = "/#/login")}
        >
          Powrót
        </button>
      </div>
    </article>
  );
};
