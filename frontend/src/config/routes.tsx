import { PrivateCourses } from "../pages/courses/Courses";
import { PrivateHome } from "../pages/home/Home";
import { Login } from "../pages/login/Login";
import { PrivateMyOffers } from "../pages/myOffers/MyOffers";
import { PrivateNews } from "../pages/news/News";
import { PrivateOfferRequests } from "../pages/offerRequests/OfferRequests";
import { PrivateOffers } from "../pages/offers/Offers";
import { Redirect } from "../pages/redirect/Redirect";
import { Register } from "../pages/register/Register";
import { UsosConnect } from "../pages/usosConnect/UsosConnect";
import { PrivateUserPage } from "../pages/userPage/UserPage";
import { PrivateModifyUser } from "../pages/modifyUser/ModifyUser";

export const routes = [
  { path: "/register", element: <Register /> },
  { path: "/login", element: <Login /> },
  { path: "/usos-connect", element: <UsosConnect /> },
  { path: "/redirect", element: <Redirect /> },
];

export const privateRoutes = [
  { path: "/offers", element: <PrivateOffers /> },
  { path: "/myOffers", element: <PrivateMyOffers /> },
  { path: "/news", element: <PrivateNews /> },
  { path: "/courses", element: <PrivateCourses /> },
  { path: "/offerRequests", element: <PrivateOfferRequests /> },
  { path: "/userPage", element: <PrivateUserPage /> },
  { path: "/modifyUser", element: <PrivateModifyUser /> },
  { path: "/", element: <PrivateHome /> },
  { path: "*", element: <PrivateHome /> },
];
