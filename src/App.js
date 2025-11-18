import React from 'react';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-blue-600">Ứng dụng Frontend</h1>
      </header>

      <LoginForm />

      <footer className="mt-8 text-gray-500">&copy; 2025 My React App</footer>
    </div>
  );
}

export default App;
