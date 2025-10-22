import { lazy } from "react";

const Home = lazy(() => import("./home/view"));
const Service = lazy(() => import("./service/view"));
const SubService = lazy(() => import("./subService/view"));
// const Login = lazy(() => import("./auth/login"));

export { Home, Service, SubService };
