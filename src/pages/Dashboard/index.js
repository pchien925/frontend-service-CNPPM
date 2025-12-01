// src/pages/Dashboard/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
      <p className="mb-6">This is a protected page. Only logged-in users can see this.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default DashboardPage;
