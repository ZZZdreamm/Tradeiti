import { useState } from 'react';
import { withPrivateRoute } from '../../common/withPrivateRoute/WithPrivateRoute';
import './ModifyUser.scss';

const ModifyUser = () => {
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
    alert(userLogin + ' ' + selectedAvatar);
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