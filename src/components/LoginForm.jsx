import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

export default function LoginForm() {
  const [usernameOrEmail, setUsernameOrEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loading, error, user, login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login({ usernameOrEmail, password });
  };

  if (user) {
    return (
      <div className="bg-white shadow rounded p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-2">Xin chào</h2>
        <p className="text-gray-600">{user.name ?? user.username ?? user.email ?? 'Người dùng'}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">Đăng nhập</h2>

      <label className="block text-sm font-medium text-gray-700">Email hoặc username</label>
      <input
        type="text"
        value={usernameOrEmail}
        onChange={(e) => setUsernameOrEmail(e.target.value)}
        required
        className="mt-1 mb-3 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-1 mb-4 block w-full rounded border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />

      {error && (
        <div className="text-red-600 text-sm mb-3">{typeof error === 'string' ? error : JSON.stringify(error)}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </form>
  );
}
