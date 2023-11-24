import "./style.scss";
import { Image } from "../../common/image/Image";
// import { getRequestToken } from "../../apiFunctions/login";
import { AuthForm } from "../../components/authForm/AuthForm";
import { UserCredentials } from "../../models/UserCredentials";
import { login } from "../../apiFunctions/login";
import { saveToken } from "../../auth/JwtToken";

export const Login = () => {
  const handleLogin = async (userCredentials: UserCredentials) => {
    login(userCredentials)
      .then((response) => {
        console.log(response);
        if (response.token) {
          saveToken(response.token);
          window.location.href = "/#/usos-connect";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="login">
      <Image src="TradeEITI.png" />
      <div className="formDiv">
        <h2>Login</h2>
        <AuthForm handleOnSubmit={handleLogin} />
      </div>
    </article>
  );
};
