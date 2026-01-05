import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/Profile";
import CartPage from "../pages/Cart";

export const privateRoutes = [
  { path: '/cart', element: <CartPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
];