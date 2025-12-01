// src/routes/index.jsx
import { Routes, Route } from 'react-router-dom';
import { publicRoutes } from './publicRoutes';
import { privateRoutes } from './privateRoutes';
import { RequireAuth } from './RequireAuth';
import { Navigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout chung cho các trang có Header/Footer */}
      <Route element={<Layout />}>
        {/* Public Routes */}
        {publicRoutes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}

        {/* Private Routes - Bảo vệ bằng RequireAuth */}
        {privateRoutes.map(({ path, element }) => (
          <Route
            key={path}
            path={path}
            element={<RequireAuth>{element}</RequireAuth>}
          />
        ))}

        {/* Redirect cũ (tuỳ chọn) */}
        <Route path="/old-url" element={<Navigate to="/about" replace />} />
      </Route>

      {/* Các route không dùng Layout (nếu có) */}
      {/* Ví dụ: full screen login đã được khai báo ở publicRoutes */}
    </Routes>
  );
}