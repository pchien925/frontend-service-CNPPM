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
  const [foodPage, setFoodPage] = useState(0);
  const [comboPage, setComboPage] = useState(0);
  const [allFoods, setAllFoods] = useState([]);
  const [allCombos, setAllCombos] = useState([]);
  const [totalFoods, setTotalFoods] = useState(0);
  const [totalCombos, setTotalCombos] = useState(0);

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
  const sortedFoods = allFoods.length > 0
    ? [...allFoods].sort((a, b) => {
        const aFeatured = isBestseller(a) ? 0 : 1;
        const bFeatured = isBestseller(b) ? 0 : 1;
        return aFeatured - bFeatured;
      })
    : [];

  const sortedCombos = allCombos.length > 0
    ? [...allCombos].sort((a, b) => {
        const aFeatured = isBestseller(a) ? 0 : 1;
        const bFeatured = isBestseller(b) ? 0 : 1;
        return aFeatured - bFeatured;
      })
    : [];

  // Display sorted items
  const displayedFoods = sortedFoods;
  const displayedCombos = sortedCombos;

  useEffect(() => {
    fetchFoods();
    fetchCombos();
  }, []);

  const fetchFoods = async () => {
    try {
      setLoadingFoods(true);
      setErrorFoods(null);
      const response = await getFoodList(0, 10);
      const { content, totalElements } = response.data || response;
      setAllFoods(content || []);
      setFoods(content || []);
      setTotalFoods(totalElements || 0);
      setFoodPage(0);
    } catch (err) {
      console.error('Lỗi tải danh sách món ăn:', err);
      setErrorFoods('Không thể tải danh sách món ăn');
    } finally {
      setLoadingFoods(false);
    }
  };

  const loadMoreFoods = async () => {
    try {
      const nextPage = foodPage + 1;
      const response = await getFoodList(nextPage, 10);
      const { content } = response.data || response;
      setAllFoods((prev) => [...prev, ...(content || [])]);
      setFoodPage(nextPage);
    } catch (err) {
      console.error('Lỗi tải thêm món ăn:', err);
    }
  };

  const fetchCombos = async () => {
    try {
      setLoadingCombos(true);
      setErrorCombos(null);
      const response = await getComboList(0, 10);
      const { content, totalElements } = response.data || response;
      setAllCombos(content || []);
      setCombos(content || []);
      setTotalCombos(totalElements || 0);
      setComboPage(0);
    } catch (err) {
      console.error('Lỗi tải danh sách combo:', err);
      setErrorCombos('Không thể tải danh sách combo');
    } finally {
      setLoadingCombos(false);
    }
  };

  const loadMoreCombos = async () => {
    try {
      const nextPage = comboPage + 1;
      const response = await getComboList(nextPage, 10);
      const { content } = response.data || response;
      setAllCombos((prev) => [...prev, ...(content || [])]);
      setComboPage(nextPage);
    } catch (err) {
      console.error('Lỗi tải thêm combo:', err);
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
          <div>
            <div className={styles.grid}>
              {displayedFoods.map((food, index) => (
                <FoodCard 
                  key={food.id} 
                  food={food}
                  featured={index < 2 && isBestseller(food)}
                />
              ))}
            </div>
            {allFoods.length < totalFoods && (
              <div className={styles.loadMoreContainer}>
                <button onClick={loadMoreFoods} className={styles.loadMoreBtn}>
                  Xem thêm món ăn
                </button>
              </div>
            )}
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
          <div>
            <div className={styles.grid}>
              {displayedCombos.map((combo, index) => (
                <ComboCard 
                  key={combo.id} 
                  combo={combo}
                  featured={index < 2 && isBestseller(combo)}
                />
              ))}
            </div>
            {allCombos.length < totalCombos && (
              <div className={styles.loadMoreContainer}>
                <button onClick={loadMoreCombos} className={styles.loadMoreBtn}>
                  Xem thêm combo
                </button>
              </div>
            )}
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
