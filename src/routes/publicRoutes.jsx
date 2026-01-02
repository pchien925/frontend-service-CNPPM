import ForgotPasswordPage from "../pages/ForgotPassword";
import HomePage from "../pages/Home";
import LoginPage from "../pages/Login";
import NotFoundPage from "../pages/NotFound";
import RegisterPage from "../pages/Register";
import ResetPasswordPage from "../pages/ResetPassword";
import FoodsPage from "../pages/Foods";
import FoodDetailPage from "../pages/FoodDetail";
import ProductsPage from "../pages/Products";
import ComboDetailPage from "../pages/ComboDetail";
import AboutPage from '../pages/About';

export const publicRoutes = [
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/foods', element: <FoodsPage /> },
  { path: '/foods/:foodId', element: <FoodDetailPage /> },
  { path: '/products', element: <ProductsPage /> },
  { path: '/combos/:comboId', element: <ComboDetailPage /> },
  { path: '*', element: <NotFoundPage /> },
];
