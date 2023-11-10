import "./style.scss";
import { Image } from "../../common/image/Image";
import { getRequestToken } from "../../apiFunctions/login";

export const Login = () => {
  // const navigate = useNavigate();
  const getToken = async () => {
    const authorizeUrl = await getRequestToken();
    window.location.href = authorizeUrl;
  };

  return (
    <article className="login">
      <Image src="TradeEITI.png" />
      <br></br>
      <button onClick={getToken} id="loginButton">
        Login
      </button>
    </article>
  );
};
