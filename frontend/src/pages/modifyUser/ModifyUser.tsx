import { useState } from "react";
import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import "./ModifyUser.scss";
import {
  changeUserAvatar,
  changeUserLogin,
} from "../../apiFunctions/changeUserData";
import { saveToken } from "../../auth/JwtToken";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../providers/AuthProvider";

const avatars = [
  { name: "man", path: "/avatars/man.png" },
  { name: "woman", path: "/avatars/woman.png" },
  { name: "helicopter", path: "/avatars/helicopter.png" },
];

const ModifyUser = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuthContext();
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser?.avatar);
  const [userLogin, setUserLogin] = useState(
    localStorage.getItem("username") || ""
  );

  const checkRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAvatar(e.target.value);
  };

  const selectAvatar = (avatarName: string) => {
    setSelectedAvatar(avatarName);
  };

  const handleChange = () => {
    if (!userLogin) return;
    if (userLogin != localStorage.getItem("username")) {
      changeUserLogin(userLogin)
        .then((response) => {
          saveToken(response.token);
          localStorage.setItem("username", userLogin);
          changeUserAvatar(selectedAvatar ? selectedAvatar : "helicopter")
            .then(() => {
              alert("Dane zmienione.");
              navigate("/userPage");
              navigate(0);
            })
            .catch((error) => {
              console.log(error);
              alert("Avatar didn't change.");
              navigate("/userPage");
              navigate(0);
            });
        })
        .catch((error) => {
          console.log(error);
          alert("Wystąpił błąd. Nazwa użytkownika zajęta.");
          navigate("/userPage");
        });
    }
  };

  return (
    <>
      <div className="userContainer">
        <div className="avatar">
          {avatars.map((avatar) => (
            <div className="avatarRadio" key={avatar.name}>
              <input
                type="radio"
                name="avatar"
                value={avatar.name}
                checked={selectedAvatar === avatar.name}
                onChange={checkRadio}
              />
              <img
                src={avatar.path}
                alt="Avatar"
                onClick={() => selectAvatar(avatar.name)}
              />
            </div>
          ))}
        </div>
        <div className="userData">
          <b>Nowa nazwa użytkownika:</b>{" "}
          <input
            type="text"
            name="userLogin"
            id="userLogin"
            placeholder={"Old login: " + userLogin}
            onChange={(e) => setUserLogin(e.target.value)}
          />
          <br />
        </div>
      </div>
      <button className="changeButton" onClick={handleChange}>
        Zapisz dane
      </button>
    </>
  );
};

export const PrivateModifyUser = withPrivateRoute(ModifyUser);
