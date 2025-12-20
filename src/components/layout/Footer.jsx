// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-gray-100 mt-auto border-t border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <h3 className="text-xl font-bold">FoodApp</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Nền tảng đặt hàng ăn uống trực tuyến số 1 Việt Nam. Chất lượng, nhanh chóng, và uy tín.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="text-gray-400 hover:text-blue-400 transition">Trang chủ</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-blue-400 transition">Sản phẩm</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-blue-400 transition">Về chúng tôi</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-blue-400 transition">Liên hệ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Câu hỏi thường gặp</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Chính sách bảo mật</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Điều khoản sử dụng</a></li>
              <li><a href="#" className="text-gray-400 hover:text-blue-400 transition">Blog</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">1900-xxxx-xxxx</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">support@foodapp.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <span className="text-gray-400">Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-slate-700 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {currentYear} FoodApp. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition p-2 rounded-lg hover:bg-white/10">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition p-2 rounded-lg hover:bg-white/10">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition p-2 rounded-lg hover:bg-white/10">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition p-2 rounded-lg hover:bg-white/10">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;