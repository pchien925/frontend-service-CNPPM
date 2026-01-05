// src/pages/FoodDetail/index.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getFoodDetail, getFoodOptions } from '../../services/foodService';
import OrderSection from '../../components/ui/OrderSection';
import { buildImageUrl } from '../../utils/imageUrl';
import { ArrowLeft, Loader, AlertCircle, Clock } from 'lucide-react';
import styles from './FoodDetail.module.css';

export default function FoodDetailPage() {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const [food, setFood] = useState(null);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFoodDetail();
  }, [foodId]);

  const fetchFoodDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Lấy thông tin món ăn
      const foodResponse = await getFoodDetail(foodId);
      const foodData = foodResponse.data || foodResponse;
      setFood(foodData);
      
      // Lấy danh sách tùy chọn của món ăn
      try {
        const optionsResponse = await getFoodOptions(foodId);
        const optionsData = optionsResponse?.data?.content || optionsResponse?.content || [];
        setOptions(optionsData);
        console.log('✅ Loaded options:', optionsData);
      } catch (optErr) {
        console.warn('Cảnh báo: Không thể tải tùy chọn:', optErr);
        setOptions([]);
      }
    } catch (err) {
      console.error('Lỗi tải chi tiết món ăn:', err);
      setError(err.response?.data?.message || 'Không thể tải chi tiết món ăn');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <Loader className={styles.spinner} />
          <p>Đang tải chi tiết...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <button
          onClick={() => navigate('/foods')}
          className={styles.backBtn}
        >
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className={styles.errorContainer}>
          <AlertCircle size={48} />
          <h2>Lỗi</h2>
          <p>{error}</p>
          <button onClick={fetchFoodDetail} className={styles.retryBtn}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!food) {
    return (
      <div className={styles.container}>
        <button
          onClick={() => navigate('/foods')}
          className={styles.backBtn}
        >
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className={styles.errorContainer}>
          <p>Không tìm thấy món ăn</p>
        </div>
      </div>
    );
  }

  const imageUrl = buildImageUrl(food.imageUrl, 'FOOD');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button onClick={() => navigate('/foods')} className={styles.backBtn}>
        <ArrowLeft size={20} /> Quay lại
      </button>

      <div className={styles.content}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <img
            src={imageUrl}
            alt={food.name}
            className={styles.image}
            onError={(e) => {
              e.target.src =
                'https://via.placeholder.com/500x400?text=No+Image';
            }}
          />
          {food.tags && food.tags.length > 0 && (
            <div className={styles.tagBadges}>
              {food.tags.map((tag) => (
                <span
                  key={tag.id}
                  className={styles.tagBadge}
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>{food.name}</h1>
            {food.category && (
              <p className={styles.category}>{food.category.name}</p>
            )}
          </div>

          {/* Meta Info */}
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <Clock size={18} />
              <span>{food.cookingTime} phút</span>
            </div>
            {food.basePrice && (
              <div className={styles.metaItem}>
                <span className={styles.price}>
                  {formatPrice(food.basePrice)}
                </span>
              </div>
            )}
          </div>

          {/* Description */}
          {food.description && (
            <div className={styles.descriptionBlock}>
              <h3>Mô tả</h3>
              <p>{food.description}</p>
            </div>
          )}

          {/* Category Description */}
          {food.category?.description && (
            <div className={styles.descriptionBlock}>
              <h3>Về danh mục</h3>
              <p>{food.category.description}</p>
            </div>
          )}

          {/* Order Section */}
          <OrderSection food={food} foodOptions={options} />
        </div>
      </div>
    </div>
  );
}
