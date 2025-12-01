// src/pages/NotFound/NotFoundPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-100 text-red-700">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="mb-6 text-xl">Oops! Page not found.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800 transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
