// src/pages/Products/index.js
import React, { useState, useEffect } from 'react';
import { searchFoods } from '../../services/foodService';
import { getComboList } from '../../services/comboService';
import { getCategoryList } from '../../services/categoryService';
import FoodCard from '../../components/ui/FoodCard';
import ComboCard from '../../components/ui/ComboCard';
import { Loader, AlertCircle, Search, X } from 'lucide-react';
import styles from './Products.module.css';

export default function ProductsPage() {
  const [foods, setFoods] = useState([]);
  const [combos, setCombos] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingFoods, setLoadingFoods] = useState(true);
  const [loadingCombos, setLoadingCombos] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorFoods, setErrorFoods] = useState(null);
  const [errorCombos, setErrorCombos] = useState(null);
  const [foodPage, setFoodPage] = useState(0);
  const [comboPage, setComboPage] = useState(0);
  const [totalFoods, setTotalFoods] = useState(0);
  const [totalCombos, setTotalCombos] = useState(0);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Utility to identify featured items (bestsellers or first in list)
  const isBestseller = (item) => item.tags?.some((tag) => tag.name === 'Bán chạy');

  // Sort items to show featured first
  const sortedFoods = foods.length > 0
    ? [...foods].sort((a, b) => {
        const aFeatured = isBestseller(a) ? 0 : 1;
        const bFeatured = isBestseller(b) ? 0 : 1;
        return aFeatured - bFeatured;
      })
    : [];

  const sortedCombos = combos.length > 0
    ? [...combos].sort((a, b) => {
        const aFeatured = isBestseller(a) ? 0 : 1;
        const bFeatured = isBestseller(b) ? 0 : 1;
        return aFeatured - bFeatured;
      })
    : [];

  useEffect(() => {
    fetchCategories();
    fetchFoods();
    fetchCombos();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoadingCategories(true);
      const response = await getCategoryList(0, 20);
      const { content } = response.data || response;
      setCategories(content || []);
    } catch (err) {
      console.error('Lỗi tải danh sách danh mục:', err);
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchFoods = async (page = 0, filters = {}) => {
    try {
      setLoadingFoods(true);
      setErrorFoods(null);
      const response = await searchFoods({
        page,
        limit: 12,
        ...filters,
      });
      const { content, totalElements } = response.data || response;
      if (page === 0) {
        setFoods(content || []);
      } else {
        setFoods((prev) => [...prev, ...(content || [])]);
      }
      setTotalFoods(totalElements || 0);
      setFoodPage(page);
    } catch (err) {
      console.error('Lỗi tải danh sách món ăn:', err);
      setErrorFoods('Không thể tải danh sách món ăn');
    } finally {
      setLoadingFoods(false);
    }
  };

  const loadMoreFoods = async () => {
    const filters = {
      ...(searchQuery && { name: searchQuery }),
      ...(selectedCategory && { categoryId: selectedCategory }),
      ...(minPrice && { minPrice: parseInt(minPrice) }),
      ...(maxPrice && { maxPrice: parseInt(maxPrice) }),
    };
    await fetchFoods(foodPage + 1, filters);
  };

  const fetchCombos = async () => {
    try {
      setLoadingCombos(true);
      setErrorCombos(null);
      const response = await getComboList(0, 10);
      const { content, totalElements } = response.data || response;
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

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {
      ...(searchQuery && { name: searchQuery }),
      ...(selectedCategory && { categoryId: selectedCategory }),
      ...(minPrice && { minPrice: parseInt(minPrice) }),
      ...(maxPrice && { maxPrice: parseInt(maxPrice) }),
    };
    fetchFoods(0, filters);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    fetchFoods(0, {});
  };

  const hasActiveFilters = searchQuery || selectedCategory || minPrice || maxPrice;

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <h1>Thực đơn</h1>
        <p>Khám phá những món ăn ngon lành</p>
      </div>

      {/* Search and Filter Section */}
      <section className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <div className={styles.searchBox}>
            <Search size={20} />
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          <button type="submit" className={styles.searchButton}>
            Tìm kiếm
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={styles.filterButton}
          >
            ⚙️ Bộ lọc
          </button>
        </form>

        {/* Filter Panel */}
        {showFilters && (
          <div className={styles.filterPanel}>
            {/* Category Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Danh mục</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div className={styles.filterGroup}>
              <label className={styles.filterLabel}>Khoảng giá</label>
              <div className={styles.priceRange}>
                <input
                  type="number"
                  placeholder="Từ"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className={styles.priceInput}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Đến"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className={styles.priceInput}
                />
              </div>
            </div>

            {/* Filter Actions */}
            <div className={styles.filterActions}>
              <button onClick={handleSearch} className={styles.applyButton}>
                Áp dụng
              </button>
              {hasActiveFilters && (
                <button onClick={clearFilters} className={styles.clearButton}>
                  <X size={16} /> Xóa bộ lọc
                </button>
              )}
            </div>
          </div>
        )}
      </section>

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
            <button onClick={() => fetchFoods(0, {})} className={styles.retryBtn}>
              Thử lại
            </button>
          </div>
        ) : foods.length > 0 ? (
          <div>
            <div className={styles.grid}>
              {sortedFoods.map((food, index) => (
                <FoodCard 
                  key={food.id} 
                  food={food}
                  featured={index < 2 && isBestseller(food)}
                />
              ))}
            </div>
            {foods.length < totalFoods && (
              <div className={styles.loadMoreContainer}>
                <button onClick={loadMoreFoods} className={styles.loadMoreBtn}>
                  Xem thêm món ăn
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Không có món ăn nào phù hợp</p>
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
              {sortedCombos.map((combo, index) => (
                <ComboCard 
                  key={combo.id} 
                  combo={combo}
                  featured={index < 2 && isBestseller(combo)}
                />
              ))}
            </div>
            {combos.length < totalCombos && (
              <div className={styles.loadMoreContainer}>
                <button onClick={fetchCombos} className={styles.loadMoreBtn}>
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
