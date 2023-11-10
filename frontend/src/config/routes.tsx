import { PrivateCourses } from "../pages/courses/Courses";
import { PrivateForLecturers } from "../pages/forLecturers/ForLecturers";
import { PrivateHome } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { PrivateMyOffers } from "../pages/myOffers/MyOffers";
import { PrivateNews } from "../pages/news/News";
import { PrivateOffers } from "../pages/offers/Offers";
import { Redirect } from "../pages/redirect/Redirect";

export const routes = [{ path: "/login", element: <Login /> }, { path: "/redirect", element: <Redirect /> }];

export const privateRoutes = [
  { path: "/offers", element: <PrivateOffers /> },
  { path: "/myOffers", element: <PrivateMyOffers /> },
  { path: "/news", element: <PrivateNews /> },
  { path: "/forLecturers", element: <PrivateForLecturers /> },
  { path: "/courses", element: <PrivateCourses /> },
  { path: "/", element: <PrivateHome /> },
  { path: "*", element: <PrivateHome /> },
];
