import { useNavigate } from "react-router-dom";
import "./NavBar.scss";
import { useAuthContext } from "../../providers/AuthProvider";

const titleAndNavigation = [
  {
    title: "HOME",
    navigation: "/",
  },
  {
    title: "OFERTY",
    navigation: "offers",
  },
  {
    title: "MOJE OFERTY",
    navigation: "myOffers",
  },
  {
    title: "WYSŁANE OFERTY",
    navigation: "offerRequests",
  },
  { title: "ZAKOŃCZONE WYMIANY", navigation: "finalizedOffers" },
  { title: "KURSY", navigation: "courses" },
];

const authenticatedLabels = [
  {
    title: "HOME",
    navigation: "/",
  },
  {
    title: "Połącz z USOS",
    navigation: "usos-connect",
  },
];

const notAuthenticatedLabels = [
  {
    title: "HOME",
    navigation: "/",
  },
  {
    title: "LOGIN",
    navigation: "login",
  },
  {
    title: "REGISTER",
    navigation: "register",
  },
];

export const NavBar = () => {
  const navigate = useNavigate();
  const { authenticated, connectedToUsos } = useAuthContext();

  const labels = authenticated
    ? connectedToUsos
      ? titleAndNavigation
      : authenticatedLabels
    : notAuthenticatedLabels;
  // const labels = titleAndNavigation;
  return (
    <nav className="navBar">
      {labels.map((item, index) => (
        <div
          key={index}
          className="menuTile"
          onClick={() => navigate(item.navigation)}
        >
          {item.title}
        </div>
      ))}
    </nav>
  );
};
