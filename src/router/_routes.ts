import { APP_ROUTES } from ".";
import { Service, SubService } from "../views";

export const _routes = [
  {
    path: APP_ROUTES.SERVICE,
    element: Service,
    exact: true,
  },
  {
    path: APP_ROUTES.SUB_SERVICE,
    element: SubService,
  },
  // {
  //   path: APP_ROUTES.SERVICE,
  //   element: Service,
  // },
];
