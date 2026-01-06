import DashboardPage from "../pages/Dashboard";
import ProfilePage from "../pages/Profile";
import CartPage from "../pages/Cart";
import CheckoutPage from "../pages/Checkout";
import OrderHistoryPage from "../pages/OrderHistory";
import OrderDetailPage from "../pages/OrderDetail";
import AddressManagementPage from "../pages/AddressManagement";
import PaymentResultPage from "../pages/PaymentResult";

export const privateRoutes = [
  { path: '/cart', element: <CartPage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  
  { path: '/order-history', element: <OrderHistoryPage /> },
  { path: '/order/:orderId', element: <OrderDetailPage /> },
  { path: '/addresses', element: <AddressManagementPage /> },
  { path: '/dashboard', element: <DashboardPage /> },
  { path: '/profile', element: <ProfilePage /> },
];