// src/pages/Home/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Home Page</h1>
      <p className="mb-6 text-lg">This is the public home page of your app.</p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 transition"
        >
          Login
        </Link>
        <Link
          to="/dashboard"
          className="px-4 py-2 bg-white text-blue-500 rounded hover:bg-gray-100 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
