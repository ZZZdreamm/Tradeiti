import { useState } from 'react';
import { withPrivateRoute } from '../../common/withPrivateRoute/WithPrivateRoute';
import './ModifyUser.scss';
import { changeUserAvatar, changeUserLogin } from '../../apiFunctions/changeUserData';
import { clearSessionStorage } from "../../common/sessionStorage";
import { saveToken } from '../../auth/JwtToken';
import { useNavigate } from 'react-router-dom';


const ModifyUser = () => {
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState('man');
  const [userLogin, setUserLogin] = useState(localStorage.getItem('username') || '');

  const checkRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAvatar(e.target.value);
  };

  const selectAvatar = (avatarName: string) => {
    setSelectedAvatar(avatarName);
  };

  const avatars = [
    { name: 'man', path: '/avatars/man.png' },
    { name: 'woman', path: '/avatars/woman.png' },
    { name: 'helicopter', path: '/avatars/helicopter.png' },
  ];

  const handleChange = () => {
    changeUserLogin(userLogin)
      .then((response) => {
        saveToken(response.token);
        changeUserAvatar(selectedAvatar.toUpperCase());
        alert("Dane zmienione");
        clearSessionStorage();
        navigate("userPage");
      })
      .catch((error) => {
        console.log(error);
        alert("Wystąpił błąd. Nazwa użytkownika zajęta.");
        clearSessionStorage();
        navigate("userPage");
      });
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
          <b>Nowa nazwa użytkownika:</b>{' '}
          <input
            type="text"
            name="userLogin"
            id="userLogin"
            placeholder={'Old login: ' + userLogin}
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