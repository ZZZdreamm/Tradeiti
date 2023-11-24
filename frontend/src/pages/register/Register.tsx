import "./style.scss";
import { Image } from "../../common/image/Image";
import { AuthForm } from "../../components/authForm/AuthForm";
import { register } from "../../apiFunctions/register";
import { UserCredentials } from "../../models/UserCredentials";
import { saveToken } from "../../auth/JwtToken";

export const Register = () => {
  const handleRegister = async (userCredentials: UserCredentials) => {
    register(userCredentials)
      .then((response) => {
        console.log(response);
        if (response.token) {
          saveToken(response.token);
          window.location.href = "/usos-connect";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <article className="login">
      <Image src="TradeEITI.png" />
      <br></br>
      <div className="formDiv">
        <h2>Register</h2>
        <AuthForm handleOnSubmit={handleRegister} />
      </div>
    </article>
  );
};
