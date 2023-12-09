import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { changeUsername } from "../../apiFunctions/change-username";
import "./ModifyUser.scss";

const ModifyUser = () => {
    const checkRadio = (e) => {
        e.target.parentElement.firstChild.checked = true;
    }
    const avatars = [
        {name: 'man',
        path: '/avatars/man.png'},
        {name: 'woman',
        path:'/avatars/woman.png'},
        {name: 'helicopter',
        path: '/avatars/helicopter.png'}
    ];
    const userName = localStorage.getItem("username");
  return (
    <>
        <div className="userContainer">
        <div className="avatar">
            {avatars.map((avatar) => (
                <div className="avatarRadio">
                <input type="radio" name="avatar" value={avatar.name} checked/>
                <img src={avatar.path} alt="Avatar" onClick={checkRadio}/>
                </div>
        ))}
        </div>
        <div className="userData">
            <b>Nowa nazwa użytkownika:</b> <input type="text" name="userLogin" id="userLogin"
            placeholder = {"Old login: " + userName}/>
            <br />
        </div>
        </div>
        <button className="changeButton">Zapisz dane</button>

    </>
  );
};

export const PrivateModifyUser = withPrivateRoute(ModifyUser);
