/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // LIGHT THEME - pastel, dịu mắt
        light: {
          primary: '#FF7F7F',        // hồng nhạt, CTA
          primaryHover: '#FF6666',
          secondary: '#FFD580',      // vàng pastel
          secondaryHover: '#FFCC66',
          accent: '#A3E4D7',         // xanh nhạt
          accentHover: '#76D7C4',
          danger: '#FFB3B3',          // đỏ nhẹ cho cảnh báo
          dangerHover: '#FF9999',
          warning: '#FFC07F',         // cam nhẹ
          warningHover: '#FFB266',
          success: '#B3FFCC',         // xanh lá dịu
          successHover: '#99FFB3',
          info: '#A3D2FF',            // xanh da trời nhạt
          infoHover: '#76C0FF',
          background: '#FFF9F2',      // trắng kem dịu mắt
          surface: '#FFFFFF',         // card / container
          textPrimary: '#2C2C2C',     // chữ chính
          textSecondary: '#555555',   // chữ phụ
          neutral: '#E0E0E0',         // màu trung tính
          border: '#CCCCCC',          // màu viền
          highlight: '#FFE6CC',       // highlight nhẹ
        },

        // DARK THEME - dịu mắt, không quá tối
        dark: {
          primary: '#FF9999',         
          primaryHover: '#FF7F7F',
          secondary: '#FFE0A3',       
          secondaryHover: '#FFD580',
          accent: '#A3E4D7',          
          accentHover: '#76D7C4',
          danger: '#FF7F7F',           
          dangerHover: '#FF6666',
          warning: '#FFB266',          
          warningHover: '#FF9966',
          success: '#66FF99',          
          successHover: '#33FF77',
          info: '#76C0FF',             
          infoHover: '#4DA3FF',
          background: '#2C2C2C',       
          surface: '#3A3A3A',          
          textPrimary: '#F2F2F2',      
          textSecondary: '#D9D9D9',    
          neutral: '#555555',          
          border: '#444444',           
          highlight: '#3E3A36',       
        },
      },
    },
  },
  plugins: [],
};
