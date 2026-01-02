// src/components/ui/ComboCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Clock } from 'lucide-react';
import { buildImageUrl } from '../../utils/imageUrl';
import styles from './ComboCard.module.css';

export default function ComboCard({ combo, featured = false }) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/combos/${combo.id}`, { state: { combo } });
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    console.log('Thêm combo vào giỏ:', combo.id);
  };

  const imageUrl = buildImageUrl(combo.imageUrl, 'COMBO');

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  // Check savings percentage (example: combo -15% vs mua lẻ)
  const savingsPercent = combo.tags?.some((tag) => tag.name === 'Premium') ? 12 : 8;
  const isBestseller = combo.tags?.some((tag) => tag.name === 'Bán chạy');

  return (
    <div 
      className={`${styles.card} ${featured ? styles.featured : ''}`} 
      onClick={handleCardClick}
    >
      {/* Savings Badge */}
      <div className={styles.savingsBadge}>
        💰 Tiết kiệm {savingsPercent}%
      </div>

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
          alt={combo.name}
          className={styles.image}
          onError={(e) => {
            e.target.src =
              'https://via.placeholder.com/300x200?text=Combo+Image';
          }}
        />

        {/* Combo Badge */}
        <div className={styles.comboBadge}>COMBO</div>

        {/* Tags - show only 1 tag when badges are present to avoid crowding */}
        {combo.tags && combo.tags.length > 0 && (
          <div className={styles.tagContainer}>
            {combo.tags.slice(0, isBestseller ? 1 : 2).map((tag) => (
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
          <span>{combo.cookingTime} min</span>
        </div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h3 className={styles.name}>{combo.name}</h3>

        {/* Category */}
        {combo.category && (
          <p className={styles.category}>{combo.category.name}</p>
        )}

        {/* Description */}
        {combo.description && (
          <p className={styles.description}>{combo.description}</p>
        )}

        {/* Footer: Price + Button */}
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(combo.basePrice)}</span>
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            aria-label="Chọn combo"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
