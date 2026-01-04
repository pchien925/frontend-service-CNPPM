// src/pages/Home/HomePage.jsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import foodService from '../../services/foodService';
import FoodCard from '../../components/ui/FoodCard';
import Loading from '../../components/ui/Loading';

const DEMO_FOODS = [
  {
    id: 1,
    name: 'Phở Bò',
    description: 'Phở bò truyền thống với nước dùng thơm ngon',
    basePrice: 50000,
    imageUrl:
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=400',
    cookingTime: 15,
    category: { id: 1, name: 'Món Chính' },
    tags: [
      { id: 1, name: 'Truyền thống' },
      { id: 2, name: 'Nổi bật' },
    ],
    options: [{ id: 1, name: 'Size' }],
  },
  {
    id: 2,
    name: 'Bánh Mì',
    description: 'Bánh mì Việt Nam với nhiều loại nhân',
    basePrice: 25000,
    imageUrl: 'https://images.unsplash.com/photo-1558564827-c0c1a5e9e39b?w=400',
    cookingTime: 5,
    category: { id: 2, name: 'Ăn Nhanh' },
    tags: [{ id: 3, name: 'Phổ biến' }],
    options: [{ id: 2, name: 'Nhân' }],
  },
  {
    id: 3,
    name: 'Cơm Gà Xối Mỡ',
    description: 'Cơm gà thơm ngon với sốt đặc biệt',
    basePrice: 45000,
    imageUrl:
      'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400',
    cookingTime: 20,
    category: { id: 1, name: 'Món Chính' },
    tags: [{ id: 4, name: 'Đặc sản' }],
    options: [],
  },
  {
    id: 4,
    name: 'Bún Chả',
    description: 'Bún chả Hà Nội với chả nướng thơm',
    basePrice: 55000,
    imageUrl:
      'https://images.unsplash.com/photo-1569562211093-4ed0d0758f12?w=400',
    cookingTime: 25,
    category: { id: 1, name: 'Món Chính' },
    tags: [{ id: 1, name: 'Truyền thống' }],
    options: [{ id: 3, name: 'Thêm chả' }],
  },
  {
    id: 5,
    name: 'Gỏi Cuốn',
    description: 'Gỏi cuốn tươi mát với tôm và rau sống',
    basePrice: 35000,
    imageUrl:
      'https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400',
    cookingTime: 10,
    category: { id: 3, name: 'Khai Vị' },
    tags: [{ id: 5, name: 'Healthy' }],
    options: [],
  },
  {
    id: 6,
    name: 'Chè Ba Màu',
    description: 'Chè ba màu ngọt mát giải nhiệt',
    basePrice: 20000,
    imageUrl: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400',
    cookingTime: 5,
    category: { id: 4, name: 'Tráng Miệng' },
    tags: [{ id: 6, name: 'Giải khát' }],
    options: [{ id: 4, name: 'Size' }],
  },
];

const HomePage = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  const fetchFoods = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const list = await foodService.getFoodList({
        limit: 6,
        page: 1,
        status: 1,
      });

      console.log('Food list:', list);

      if (Array.isArray(list) && list.length > 0) {
        setFoods(list.slice(0, 6));
      } else {
        setFoods(DEMO_FOODS);
        setError('API không trả danh sách món. Hiển thị dữ liệu mẫu.');
      }
    } catch (err) {
      console.error('API Error:', err);

      const status = err?.response?.status;
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Không thể tải dữ liệu món ăn';

      setFoods(DEMO_FOODS);
      setError(
        status === 401 ? 'API yêu cầu đăng nhập. Hiển thị dữ liệu mẫu.' : msg,
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const filteredFoods = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return foods;

    return foods.filter((f) => {
      const name = (f?.name || '').toLowerCase();
      const desc = (f?.description || '').toLowerCase();
      const cat = (f?.category?.name || f?.category || '').toLowerCase();
      return name.includes(q) || desc.includes(q) || cat.includes(q);
    });
  }, [foods, query]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
        <Loading show={true} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* HERO (bo góc banner) */}
      <section className="py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl border border-white/20 shadow-xl">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500" />
            <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />

            <div className="relative px-6 sm:px-10 py-14 sm:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div className="text-white">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-sm mb-4">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    Mở cửa mỗi ngày • Giao nhanh
                  </div>

                  <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
                    Chào mừng đến với <br />
                    <span className="text-white/95">Nhà Hàng</span>
                  </h1>

                  <p className="mt-4 text-lg text-white/90">
                    Khám phá những món ăn ngon, chất lượng và được yêu thích
                    nhất.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <Link
                      to="/dashboard"
                      className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white text-orange-600 font-semibold hover:bg-white/95 transition"
                    >
                      Khám phá thực đơn
                    </Link>
                    <button
                      type="button"
                      onClick={fetchFoods}
                      className="inline-flex items-center justify-center px-6 py-3 rounded-2xl bg-white/10 text-white border border-white/25 font-semibold hover:bg-white/15 transition"
                    >
                      Tải lại món nổi bật
                    </button>
                  </div>

                  <div className="mt-8">
                    <div className="relative">
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Tìm món ăn, danh mục…"
                        className="w-full sm:w-[420px] bg-white/95 text-gray-900 placeholder:text-gray-500 rounded-2xl px-5 py-4 pr-12 outline-none ring-2 ring-transparent focus:ring-white/60"
                      />
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                        🔎
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white/95 rounded-3xl shadow-xl p-6 border border-white/60">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-gray-900">
                      Hôm nay ăn gì?
                    </h3>
                    <span className="text-sm text-gray-500">
                      {foods.length} món nổi bật
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-orange-50 p-4">
                      <div className="text-2xl">⚡</div>
                      <div className="mt-1 font-semibold text-gray-900">
                        Nhanh
                      </div>
                      <div className="text-sm text-gray-600">Chuẩn vị</div>
                    </div>
                    <div className="rounded-2xl bg-orange-50 p-4">
                      <div className="text-2xl">🥗</div>
                      <div className="mt-1 font-semibold text-gray-900">
                        Tươi
                      </div>
                      <div className="text-sm text-gray-600">An toàn</div>
                    </div>
                    <div className="rounded-2xl bg-orange-50 p-4">
                      <div className="text-2xl">⭐</div>
                      <div className="mt-1 font-semibold text-gray-900">
                        Top
                      </div>
                      <div className="text-sm text-gray-600">Yêu thích</div>
                    </div>
                  </div>

                  <div className="mt-5 text-sm text-gray-600">
                    Gợi ý: nhập từ khóa để lọc món theo tên / mô tả / danh mục.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED FOODS */}
      <section className="py-14 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                Món ăn nổi bật
              </h2>
              <p className="mt-2 text-gray-600">
                Những món được yêu thích nhất — cập nhật liên tục.
              </p>
            </div>

            <div className="flex gap-3">
              <Link
                to="/dashboard"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition"
              >
                Xem toàn bộ
              </Link>
              <button
                type="button"
                onClick={() => setQuery('')}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-2xl bg-white border border-gray-200 text-gray-800 font-semibold hover:bg-gray-50 transition"
              >
                Xoá lọc
              </button>
            </div>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-yellow-200 bg-yellow-50 p-4 text-yellow-800">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">Thông báo</p>
                  <p className="text-sm mt-1 opacity-90">{error}</p>
                </div>
                <button
                  type="button"
                  onClick={fetchFoods}
                  className="shrink-0 px-4 py-2 rounded-xl bg-yellow-100 hover:bg-yellow-200 border border-yellow-200 font-semibold transition"
                >
                  Thử lại
                </button>
              </div>
            </div>
          )}

          {filteredFoods.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredFoods.slice(0, 6).map((food) => (
                <FoodCard
                  key={food?.id ?? food?._id ?? food?.name}
                  food={food}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <div className="text-5xl mb-3">🍲</div>
              <p className="text-xl font-bold text-gray-900">
                Không tìm thấy món phù hợp
              </p>
              <p className="text-gray-600 mt-2">
                Thử đổi từ khoá hoặc bấm “Xoá lọc”.
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="py-10 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Nhà Hàng • All rights reserved
      </footer>
    </div>
  );
};

export default HomePage;
