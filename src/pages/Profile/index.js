import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, Trash2, Check } from 'lucide-react';
import profileService from '../../services/profileService';
import addressService from '../../services/addressService';
import { getCacheAccessToken, removeCacheToken } from '../../services/userService';

export default function ProfilePage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addressesLoading, setAddressesLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');

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

  const fetchAddresses = async () => {
    if (!profile?.id) return;
    try {
      setAddressesLoading(true);
      const res = await addressService.getAddresses(0, 20, profile.id);
      if (res.result && res.data?.content) {
        setAddresses(res.data.content);
      }
    } catch (err) {
      console.error('Error fetching addresses:', err);
    } finally {
      setAddressesLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'addresses' && profile?.id && addresses.length === 0) {
      fetchAddresses();
    }
  }, [activeTab, profile?.id]);

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
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="text-center mb-8 py-8 px-4 bg-gradient-to-r from-orange-500 to-red-500">
          <h1 className="text-4xl font-bold text-white">Tài khoản của tôi</h1>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === 'profile'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Thông tin cá nhân
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`flex-1 py-4 px-6 font-semibold transition ${
              activeTab === 'addresses'
                ? 'text-orange-500 border-b-2 border-orange-500'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Địa chỉ của tôi
          </button>
        </div>

        <div className="p-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <>
              {/* Avatar */}
              <div className="text-center mb-8">
                {profile?.avatarPath ? (
                  <img
                    src={`https://backend-service-cnppm.onrender.com/api/file/download/${profile.avatarPath}`}
                    alt="Avatar"
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-orange-500 shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full mx-auto bg-orange-500/20 flex items-center justify-center text-gray-400">
                    <span className="text-6xl">👤</span>
                  </div>
                )}
              </div>

              {/* Profile Info */}
              <div className="space-y-6">
                {/* Username */}
                <div className="border-b pb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Tên đăng nhập</label>
                  <p className="text-xl text-gray-800 mt-2">{profile?.username}</p>
                </div>

                {/* Full Name */}
                <div className="border-b pb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Họ và tên</label>
                  <p className="text-xl text-gray-800 mt-2">{profile?.fullName}</p>
                </div>

                {/* Email */}
                <div className="border-b pb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Email</label>
                  <p className="text-xl text-gray-800 mt-2">{profile?.email}</p>
                </div>

                {/* Phone */}
                <div className="border-b pb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Số điện thoại</label>
                  <p className="text-xl text-gray-800 mt-2">{profile?.phone || 'Chưa cập nhật'}</p>
                </div>

                {/* Status */}
                <div className="border-b pb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Trạng thái</label>
                  <div className="mt-2">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      profile?.status === 1 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {profile?.status === 1 ? 'Hoạt động' : 'Bị khóa'}
                    </span>
                  </div>
                </div>

                {/* Kind */}
                <div className="pb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase">Loại tài khoản</label>
                  <p className="text-xl text-gray-800 mt-2">
                    {profile?.kind === 0 ? 'Khách hàng' : profile?.kind === 1 ? 'Nhân viên' : 'Quản lý'}
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Addresses Tab */}
          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Danh sách địa chỉ của tôi</h2>
                <button
                  onClick={() => navigate('/addresses')}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                >
                  <Plus size={20} /> Thêm địa chỉ
                </button>
              </div>

              {addressesLoading ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Đang tải địa chỉ...</p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Bạn chưa có địa chỉ nào</p>
                  <button
                    onClick={() => navigate('/addresses')}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
                  >
                    Thêm địa chỉ đầu tiên
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <div key={address.id} className="border rounded-lg p-4 hover:shadow-lg transition">
                      {/* Default Badge */}
                      {address.isDefault && (
                        <div className="flex items-center gap-1 text-green-600 text-sm font-semibold mb-2">
                          <Check size={16} /> Địa chỉ mặc định
                        </div>
                      )}

                      {/* Recipient Info */}
                      <h3 className="font-bold text-gray-800 mb-2">{address.recipientName}</h3>
                      <p className="text-sm text-gray-600 mb-1">{address.phone}</p>

                      {/* Address Details */}
                      <div className="text-sm text-gray-600 space-y-1 mb-4 bg-gray-50 p-3 rounded">
                        <p>{address.addressLine}</p>
                        {address.ward && <p>{address.ward.name}</p>}
                        {address.district && <p>{address.district.name}</p>}
                        {address.province && <p className="font-semibold">{address.province.name}</p>}
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => navigate('/addresses')}
                          className="px-3 py-1 text-sm border border-orange-500 text-orange-500 rounded hover:bg-orange-50 transition"
                        >
                          Chỉnh sửa
                        </button>
                        <button className="px-3 py-1 text-sm border border-red-500 text-red-500 rounded hover:bg-red-50 transition">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 p-8 border-t bg-gray-50">
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
