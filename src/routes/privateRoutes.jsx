import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/Profile";

export const privateRoutes = [
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
];