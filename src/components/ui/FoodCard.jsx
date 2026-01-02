// src/components/ui/FoodCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Clock } from 'lucide-react';
import { buildImageUrl } from '../../utils/imageUrl';
import styles from './FoodCard.module.css';

export default function FoodCard({ food, featured = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/foods/${food.id}`, { state: { food } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('Thêm vào giỏ:', food.id);
  };

  const imageUrl = buildImageUrl(food.imageUrl, 'FOOD');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Check if bestseller
  const isBestseller = food.tags?.some((tag) => tag.name === 'Bán chạy');

  return (
    <div 
      className={`${styles.card} ${featured ? styles.featured : ''}`} 
      onClick={handleCardClick}
    >
      {/* Bestseller Badge */}
      {isBestseller && (
        <div className={styles.bestsellerBadge}>
          ⭐ Bán chạy
        </div>
      )}

      {/* Image Container */}
      <div className={styles.imageContainer}>
        <img
          src={imageUrl}
          alt={food.name}
          className={styles.image}
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />

        {/* Tags */}
        {food.tags && food.tags.length > 0 && (
          <div className={styles.tagContainer}>
            {food.tags.slice(0, featured ? 3 : 2).map((tag) => (
              <span
                key={tag.id}
                className={styles.tag}
                style={{ backgroundColor: tag.color }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Cooking Time Badge */}
        <div className={styles.cookingTime}>
          <Clock size={14} />
          <span>{food.cookingTime} min</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{food.name}</h3>

        {/* Category */}
        {food.category && (
          <p className={styles.category}>{food.category.name}</p>
        )}

        {/* Description */}
        {food.description && (
          <p className={styles.description}>{food.description}</p>
        )}

        {/* Footer: Price + Button */}
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(food.basePrice)}</span>
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            aria-label="Thêm vào giỏ hàng"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
