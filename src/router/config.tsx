import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Fabrics from "../pages/fabrics/page";
import Tailoring from "../pages/tailoring/page";
import Orders from "../pages/orders/page";
import Cart from "../pages/cart/page";
import Checkout from "../pages/checkout/page";
import Profile from "../pages/profile/page";
import Search from "../pages/search/page";
import FabricDetail from "../pages/fabric-detail/page";
import About from "../pages/about/page";
import AdminOverview from "../pages/admin/overview/page";
import AdminFabrics from "../pages/admin/fabrics/page";
import AdminTailoringOptions from "../pages/admin/tailoring-options/page";
import AdminTailors from "../pages/admin/tailors/page";
import AdminOrders from "../pages/admin/orders/page";
import AdminSettings from "../pages/admin/settings/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/fabrics",
    element: <Fabrics />,
  },
  {
    path: "/tailoring",
    element: <Tailoring />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/search",
    element: <Search />,
  },
  {
    path: "/fabric/:id",
    element: <FabricDetail />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/admin",
    element: <AdminOverview />,
  },
  {
    path: "/admin/fabrics",
    element: <AdminFabrics />,
  },
  {
    path: "/admin/tailoring-options",
    element: <AdminTailoringOptions />,
  },
  {
    path: "/admin/tailors",
    element: <AdminTailors />,
  },
  {
    path: "/admin/orders",
    element: <AdminOrders />,
  },
  {
    path: "/admin/settings",
    element: <AdminSettings />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
