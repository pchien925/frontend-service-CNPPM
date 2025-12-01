import React from 'react';

const AppLoading = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white/80 to-gray-100/70 backdrop-blur-sm flex flex-col justify-center items-center z-50">
      <div className="relative">
        <div className="animate-spin rounded-full h-14 w-14 border-4 border-gray-300 border-t-blue-500 shadow-md"></div>
      </div>

      <span className="mt-4 text-base font-medium text-gray-600 animate-pulse">
        Đang tải...
      </span>
    </div>
  );
};

export default AppLoading;
