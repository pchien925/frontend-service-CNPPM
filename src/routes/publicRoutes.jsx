import ForgotPasswordPage from "../pages/ForgotPassword";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import NotFoundPage from "../pages/NotFound";
import RegisterPage from "../pages/Register";
import ResetPasswordPage from "../pages/ResetPassword";

export const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '*', element: <NotFoundPage /> },
];