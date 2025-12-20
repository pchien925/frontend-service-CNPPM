// src/components/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Home, ShoppingBag, Info } from 'lucide-react';
import useAuth from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg border-b border-slate-700 fixed top-0 left-0 right-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-xl text-white hidden sm:block">FoodApp</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            <NavLink to="/" icon={Home} label="Trang chủ" />
            <NavLink to="/products" icon={ShoppingBag} label="Sản phẩm" />
            <NavLink to="/about" icon={Info} label="Về chúng tôi" />
          </nav>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 text-white hover:opacity-80 transition px-3 py-2 rounded-lg hover:bg-white/10"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold text-sm">
                    {user.fullName?.charAt(0).toUpperCase() || user.username?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <span className="hidden lg:block font-medium text-sm">{user.fullName || user.username}</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 overflow-hidden">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-indigo-50">
                      <p className="font-semibold text-gray-800 text-sm">{user.fullName || user.username}</p>
                      <p className="text-gray-500 text-xs">{user.email}</p>
                    </div>

                    {/* Menu Items */}
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <User className="w-4 h-4 mr-3" /> Hồ sơ cá nhân
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      <Settings className="w-4 h-4 mr-3" /> Cài đặt
                    </Link>
                    
                    <hr className="my-1" />
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50 transition"
                    >
                      <LogOut className="w-4 h-4 mr-3" /> Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                Đăng nhập
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-800/50 backdrop-blur border-t border-slate-700 py-4 space-y-2">
            <MobileNavLink to="/" icon={Home} label="Trang chủ" setOpen={setMobileMenuOpen} />
            <MobileNavLink to="/products" icon={ShoppingBag} label="Sản phẩm" setOpen={setMobileMenuOpen} />
            <MobileNavLink to="/about" icon={Info} label="Về chúng tôi" setOpen={setMobileMenuOpen} />
          </div>
        )}
      </div>
    </header>
  );
};

// Helper components
const NavLink = ({ to, icon: Icon, label }) => (
  <Link
    to={to}
    className="flex items-center space-x-1 text-gray-300 hover:text-white px-3 py-2 rounded-lg hover:bg-white/10 transition font-medium text-sm"
  >
    <Icon className="w-4 h-4" />
    <span>{label}</span>
  </Link>
);

const MobileNavLink = ({ to, icon: Icon, label, setOpen }) => (
  <Link
    to={to}
    className="flex items-center space-x-3 text-gray-300 hover:text-white px-4 py-2 rounded-lg hover:bg-white/10 transition"
    onClick={() => setOpen(false)}
  >
    <Icon className="w-5 h-5" />
    <span>{label}</span>
  </Link>
);

export default Header;