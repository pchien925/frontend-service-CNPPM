import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import profileService from '../../services/profileService';
import { getCacheAccessToken, removeCacheToken } from '../../services/userService';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const accessToken = getCacheAccessToken();
        
        if (!accessToken) {
          navigate('/login');
          return;
        }

        const data = await profileService.getProfile();
        setProfile(data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message);
        
        // If unauthorized, redirect to login
        if (err.message.includes('Unauthorized')) {
          removeCacheToken();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    removeCacheToken();
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-primary/10">
        <div className="text-center">
          <p className="text-xl text-gray-600">Đang tải thông tin...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-primary/10">
        <div className="text-center">
          <p className="text-xl text-red-600 mb-4">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-2 bg-light-primary text-white rounded-lg hover:bg-opacity-90"
          >
            Quay lại đăng nhập
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-primary/10">
        <div className="text-center">
          <p className="text-xl text-gray-600">Không có thông tin profile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light-primary/10 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-light-primary mb-4">Thông tin cá nhân</h1>
        </div>

        {/* Avatar */}
        <div className="text-center mb-8">
          {profile.avatarPath ? (
            <img
              src={`https://backend-service-cnppm.onrender.com/api/file/download/${profile.avatarPath}`}
              alt="Avatar"
              className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-light-primary shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full mx-auto bg-light-primary/20 flex items-center justify-center text-gray-400">
              <span className="text-6xl">👤</span>
            </div>
          )}
        </div>

        {/* Profile Info */}
        <div className="space-y-6">
          {/* Username */}
          <div className="border-b pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Tên đăng nhập</label>
            <p className="text-xl text-gray-800 mt-2">{profile.username}</p>
          </div>

          {/* Full Name */}
          <div className="border-b pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Họ và tên</label>
            <p className="text-xl text-gray-800 mt-2">{profile.fullName}</p>
          </div>

          {/* Email */}
          <div className="border-b pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Email</label>
            <p className="text-xl text-gray-800 mt-2">{profile.email}</p>
          </div>

          {/* Phone */}
          <div className="border-b pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Số điện thoại</label>
            <p className="text-xl text-gray-800 mt-2">{profile.phone || 'Chưa cập nhật'}</p>
          </div>

          {/* Status */}
          <div className="border-b pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Trạng thái</label>
            <div className="mt-2">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                profile.status === 1 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {profile.status === 1 ? 'Hoạt động' : 'Bị khóa'}
              </span>
            </div>
          </div>

          {/* Kind */}
          <div className="pb-4">
            <label className="text-sm font-semibold text-gray-500 uppercase">Loại tài khoản</label>
            <p className="text-xl text-gray-800 mt-2">
              {profile.kind === 0 ? 'Khách hàng' : profile.kind === 1 ? 'Nhân viên' : 'Quản lý'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate('/')}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
          >
            Quay lại
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}
