// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 text-white mt-auto border-t border-orange-400/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-lg flex items-center justify-center border border-white/30">
                <span className="text-white font-bold text-lg">🍽️</span>
              </div>
              <h3 className="text-xl font-bold">UTE FOOD</h3>
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Nền tảng đặt hàng ăn uống trực tuyến số 1 Việt Nam. Chất lượng,
              nhanh chóng, và uy tín.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Menu</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-white/80 hover:text-white transition"
                >
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-white/80 hover:text-white transition"
                >
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-white transition"
                >
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white/80 hover:text-white transition"
                >
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition"
                >
                  Câu hỏi thường gặp
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition"
                >
                  Chính sách bảo mật
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition"
                >
                  Điều khoản sử dụng
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-white transition"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Phone className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                <span className="text-white/80">1900-xxxx-xxxx</span>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                <span className="text-white/80">support@foodapp.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-white mt-1 flex-shrink-0" />
                <span className="text-white/80">Hà Nội, Việt Nam</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-white/20 my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <p className="text-white/80 text-sm text-center md:text-left">
            &copy; {currentYear} Nhà Hàng. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex space-x-4 mt-6 md:mt-0">
            <a
              href="#"
              className="text-white/80 hover:text-white transition p-2 rounded-lg hover:bg-white/10"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition p-2 rounded-lg hover:bg-white/10"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition p-2 rounded-lg hover:bg-white/10"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-white/80 hover:text-white transition p-2 rounded-lg hover:bg-white/10"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
