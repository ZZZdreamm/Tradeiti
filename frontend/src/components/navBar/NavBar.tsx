import { useNavigate } from "react-router-dom";
import "./NavBar.scss";

const titleAndNavigation = [
  {
    title: "AKTUALNOŚCI",
    navigation: "news",
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
    title: "DLA WYKŁADOWCY",
    navigation: "forLecturers",
  },
  { title: "KURSY", navigation: "courses" },
];

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navBar">
      {titleAndNavigation.map((item) => (
        <div className="menuTile" onClick={() => navigate(item.navigation)}>
          {item.title}
        </div>
      ))}
    </nav>
  );
};
