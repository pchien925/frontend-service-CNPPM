import React from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Loading from '../ui/Loading';
import useAuth from '../../hooks/useAuth';

const Layout = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Danh sách các route KHÔNG hiển thị Layout đầy đủ (login, register, 404, v.v.)
  const noLayoutRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  // Nếu đang ở trang login → chỉ render Outlet (không header, footer)
  if (isNoLayout) {
    return <Outlet />;
  }

  // Loading state khi đang fetch profile lần đầu
  if (isAuthenticated === false && user === null && localStorage.getItem('access_token')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loading show={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header - luôn hiển thị khi đã login */}
      <Header />

      <div className="flex flex-1">

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isAuthenticated && location.pathname.startsWith('/dashboard') ? 'lg:ml-64' : ''}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb (tùy chọn) */}
            {/* <Breadcrumb /> */}

            {/* Nội dung các trang con */}
            <Outlet />
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;