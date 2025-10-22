import { Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { _routes } from "./_routes";
import "react-lazy-load-image-component/src/effects/opacity.css";
import PrivateRoute from "./PrivateRoute";
import { initApp } from "../helpers/api";

const Router = () => {
  initApp();

  return (
    <HashRouter>
      <Suspense>
        <Routes>
          {_routes?.map(({ path, element: Component }, idx) => (
            <Route
              key={idx}
              path={path}
              element={<PrivateRoute child={<Component />} />}
            />
          ))}
        </Routes>
      </Suspense>
    </HashRouter>
  );
};

export default Router;
