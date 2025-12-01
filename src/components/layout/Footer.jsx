// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
        <p className="text-gray-400 text-sm mt-2">Made with love by Your Team</p>
      </div>
    </footer>
  );
};

export default Footer;