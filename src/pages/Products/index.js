// src/pages/Products/index.js
import React, { useState, useEffect } from 'react';
import { getFoodList } from '../../services/foodService';
import { getComboList } from '../../services/comboService';
import FoodCard from '../../components/ui/FoodCard';
import ComboCard from '../../components/ui/ComboCard';
import { Loader, AlertCircle } from 'lucide-react';
import styles from './Products.module.css';

export default function ProductsPage() {
  const [foods, setFoods] = useState([]);
  const [combos, setCombos] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [loadingCombos, setLoadingCombos] = useState(true);
  const [errorFoods, setErrorFoods] = useState(null);
  const [errorCombos, setErrorCombos] = useState(null);

  // Utility to identify featured items (bestsellers or first in list)
  const isBestseller = (item) => item.tags?.some((tag) => tag.name === 'Bán chạy');
  const getFeaturedItems = (items, count = 2) => {
    const featured = items.filter(isBestseller).slice(0, count);
    const remaining = items.filter((item) => !isBestseller(item));
    return [
      ...featured.slice(0, 2),
      ...remaining.slice(0, Math.max(0, count - featured.length)),
    ];
  };

  // Sort items to show featured first
  const sortedFoods = foods.length > 0
    ? [...foods].sort((a, b) => {
        const aFeatured = isBestseller(a) ? 0 : 1;
        const bFeatured = isBestseller(b) ? 0 : 1;
        return aFeatured - bFeatured;
      })
    : [];

  const sortedCombos = combos.length > 0
    ? [...combos].sort(() => Math.random() - 0.5).slice(0, 10) // Shuffle & limit combos
    : [];

  // Get featured items for front placement
  const featuredCombos = getFeaturedItems(sortedCombos, 2);

  useEffect(() => {
    fetchFoods();
    fetchCombos();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoadingFoods(true);
      setErrorFoods(null);
      const response = await getFoodList(0, 20);
      const { content } = response.data || response;
      setFoods(content || []);
    } catch (err) {
      console.error('Lỗi tải danh sách món ăn:', err);
      setErrorFoods('Không thể tải danh sách món ăn');
    } finally {
      setLoadingFoods(false);
    }
  };

  const fetchCombos = async () => {
    try {
      setLoadingCombos(true);
      setErrorCombos(null);
      const response = await getComboList(0, 20);
      const { content } = response.data || response;
      setCombos(content || []);
    } catch (err) {
      console.error('Lỗi tải danh sách combo:', err);
      setErrorCombos('Không thể tải danh sách combo');
    } finally {
      setLoadingCombos(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Thực đơn</h1>
        <p>Khám phá những món ăn ngon lành</p>
      </div>

      {/* Foods Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🍕 Món Ăn Lẻ</h2>
          {loadingFoods && <span className={styles.badge}>Đang tải...</span>}
        </div>

        {loadingFoods ? (
          <div className={styles.loadingContainer}>
            <Loader className={styles.spinner} />
            <p>Đang tải danh sách món ăn...</p>
          </div>
        ) : errorFoods ? (
          <div className={styles.errorContainer}>
            <AlertCircle size={32} />
            <p>{errorFoods}</p>
            <button onClick={fetchFoods} className={styles.retryBtn}>
              Thử lại
            </button>
          </div>
        ) : foods.length > 0 ? (
          <div className={styles.grid}>
            {sortedFoods.map((food, index) => (
              <FoodCard 
                key={food.id} 
                food={food}
                featured={index < 2 && isBestseller(food)}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Không có món ăn nào</p>
          </div>
        )}
      </section>

      {/* Combos Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>🎁 Combo Ưu Đãi</h2>
          {loadingCombos && <span className={styles.badge}>Đang tải...</span>}
        </div>

        {loadingCombos ? (
          <div className={styles.loadingContainer}>
            <Loader className={styles.spinner} />
            <p>Đang tải danh sách combo...</p>
          </div>
        ) : errorCombos ? (
          <div className={styles.errorContainer}>
            <AlertCircle size={32} />
            <p>{errorCombos}</p>
            <button onClick={fetchCombos} className={styles.retryBtn}>
              Thử lại
            </button>
          </div>
        ) : combos.length > 0 ? (
          <div className={styles.grid}>
            {featuredCombos.map((combo, index) => (
              <ComboCard 
                key={combo.id} 
                combo={combo}
                featured={index < 2}
              />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Không có combo nào</p>
          </div>
        )}
      </section>
    </div>
  );
}
