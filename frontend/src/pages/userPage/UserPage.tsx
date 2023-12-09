import { withPrivateRoute } from "../../common/withPrivateRoute/WithPrivateRoute";
import { useNavigate } from "react-router-dom";
import "./UserPage.scss";

const UserPage = () => {
    const navigate = useNavigate();
    const userName = localStorage.getItem("username");
    return (
        <>
        <div className="userContainer">
        <div className="avatar">
            <img src="/avatars/man.png" alt="Avatar"/>
        </div>
        <div className="userData">
            <b>Nazwa użytkownika:</b> <input type="text" name="userLogin" id="userLogin" placeholder={userName ? userName : 'Connection error'} disabled/>
            <br />
        </div>
        </div>
        <button className="changeButton" onClick={() => navigate('../modifyUser')}>Zmień dane</button>

        </>
    );
};

export const PrivateUserPage = withPrivateRoute(UserPage);
