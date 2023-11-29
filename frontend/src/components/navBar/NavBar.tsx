import { useNavigate } from "react-router-dom";
import "./NavBar.scss";

const titleAndNavigation = [
  {
    title: "Home",
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
  { title: "KURSY", navigation: "courses" },
];

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navBar">
      {titleAndNavigation.map((item, index) => (
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
