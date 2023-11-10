import { Route, Routes } from "react-router-dom";
import { privateRoutes, routes } from "../config/routes";

export const RoutesProvider = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
      {privateRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element}></Route>
      ))}
    </Routes>
  );
};
