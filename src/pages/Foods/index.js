// src/pages/Foods/index.js
import React, { useState, useEffect } from 'react';
import { getFoodList } from '../../services/foodService';
import FoodCard from '../../components/ui/FoodCard';
import { Loader, AlertCircle } from 'lucide-react';
import styles from './FoodList.module.css';

export default function FoodsPage() {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 0,
    pageSize: 20,
    totalPages: 0,
    totalElements: 0,
  });

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async (page = 0) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getFoodList(page, pagination.pageSize);

      // API trả về { data: { content, totalElements, totalPages } }
      const { content, totalElements, totalPages } = response.data || response;

      setFoods(content || []);
      setPagination({
        currentPage: page,
        pageSize: pagination.pageSize,
        totalPages: totalPages || 0,
        totalElements: totalElements || 0,
      });
    } catch (err) {
      console.error('Lỗi tải danh sách món ăn:', err);
      setError(err.response?.data?.message || 'Không thể tải danh sách món ăn');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 0 && page < pagination.totalPages) {
      fetchFoods(page);
      window.scrollTo(0, 0);
    }
  };

  if (loading && foods.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader className={styles.spinner} />
          <p>Đang tải danh sách món ăn...</p>
        </div>
      </div>
    );
  }

  if (error && foods.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <AlertCircle size={48} />
          <h2>Lỗi</h2>
          <p>{error}</p>
          <button onClick={() => fetchFoods(0)} className={styles.retryBtn}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Danh sách món ăn</h1>
        <p>Chọn những món ăn yêu thích của bạn</p>
      </div>

      {/* Foods Grid */}
      <div className={styles.grid}>
        {foods && foods.length > 0 ? (
          foods.map((food) => <FoodCard key={food.id} food={food} />)
        ) : (
          <div className={styles.empty}>
            <p>Không có món ăn nào</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 0}
            className={styles.pageBtn}
          >
            ← Trang trước
          </button>

          <div className={styles.pageInfo}>
            Trang {pagination.currentPage + 1} / {pagination.totalPages}
          </div>

          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage >= pagination.totalPages - 1}
            className={styles.pageBtn}
          >
            Trang sau →
          </button>
        </div>
      )}
    </div>
  );
}
