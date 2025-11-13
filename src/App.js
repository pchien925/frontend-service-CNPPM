import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Hello React + Tailwind</h1>
      </header>

      {/* Card Content */}
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm text-center">
        <p className="text-gray-700 mb-4">
          Đây là ví dụ giao diện đơn giản sử dụng Tailwind CSS.
        </p>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Click Me
        </button>
      </div>

      {/* Footer */}
      <footer className="mt-8 text-gray-500">
        &copy; 2025 My React App
      </footer>
    </div>
  );
}

export default App;
