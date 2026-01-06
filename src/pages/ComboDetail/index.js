// src/pages/ComboDetail/index.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getComboDetail } from '../../services/comboService';
import OrderSection from '../../components/ui/OrderSection';
import ComboGroupSection from '../../components/ui/ComboGroupSection';
import { buildImageUrl } from '../../utils/imageUrl';
import { ArrowLeft, Loader, AlertCircle, Clock } from 'lucide-react';
import styles from './ComboDetail.module.css';

export default function ComboDetailPage() {
  const { comboId } = useParams();
  const navigate = useNavigate();
  const [combo, setCombo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comboGroupSelections, setComboGroupSelections] = useState({
    selections: {},
    isValid: false,
    extraPrice: 0,
  });

  useEffect(() => {
    fetchComboDetail();
  }, [comboId]);

  const fetchComboDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getComboDetail(comboId);
      const comboData = response.data || response;
      setCombo(comboData);
    } catch (err) {
      console.error('Lỗi tải chi tiết combo:', err);
      setError(err.response?.data?.message || 'Không thể tải chi tiết combo');
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
          onClick={() => navigate('/products')}
          className={styles.backBtn}
        >
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className={styles.errorContainer}>
          <AlertCircle size={48} />
          <h2>Lỗi</h2>
          <p>{error}</p>
          <button onClick={fetchComboDetail} className={styles.retryBtn}>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  if (!combo) {
    return (
      <div className={styles.container}>
        <button
          onClick={() => navigate('/products')}
          className={styles.backBtn}
        >
          <ArrowLeft size={20} /> Quay lại
        </button>
        <div className={styles.errorContainer}>
          <p>Không tìm thấy combo</p>
        </div>
      </div>
    );
  }

  const imageUrl = buildImageUrl(combo.imageUrl, 'COMBO');

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className={styles.container}>
      {/* Back Button */}
      <button onClick={() => navigate('/products')} className={styles.backBtn}>
        <ArrowLeft size={20} /> Quay lại
      </button>

      <div className={styles.content}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <div className={styles.imageWrapper}>
            <img
              src={imageUrl}
              alt={combo.name}
              className={styles.image}
              onError={(e) => {
                e.target.src =
                  'https://via.placeholder.com/500x400?text=Combo+Image';
              }}
            />
            <div className={styles.comboBadge}>COMBO PACKAGE</div>
          </div>
        </div>

        {/* Info Section */}
        <div className={styles.infoSection}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.title}>{combo.name}</h1>
            {combo.category && (
              <p className={styles.category}>{combo.category.name}</p>
            )}
          </div>

          {/* Meta Info */}
          <div className={styles.metaInfo}>
            <div className={styles.metaItem}>
              <Clock size={18} />
              <span>{combo.cookingTime} phút</span>
            </div>
            {combo.basePrice && (
              <div className={styles.metaItem}>
                <span className={styles.price}>
                  {formatPrice(combo.basePrice)}
                </span>
              </div>
            )}
          </div>

          {/* Tags */}
          {combo.tags && combo.tags.length > 0 && (
            <div className={styles.tagBadges}>
              {combo.tags.map((tag) => (
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

          {/* Description */}
          {combo.description && (
            <div className={styles.descriptionBlock}>
              <h3>Thông tin combo</h3>
              <p>{combo.description}</p>
            </div>
          )}

          {/* Category Description */}
          {combo.category?.description && (
            <div className={styles.descriptionBlock}>
              <h3>Về danh mục</h3>
              <p>{combo.category.description}</p>
            </div>
          )}

          {/* Benefits Section */}
          <div className={styles.descriptionBlock}>
            <h3>✨ Ưu điểm combo</h3>
            <ul className={styles.benefitsList}>
              <li>Giá ưu đãi so với mua lẻ</li>
              <li>Phù hợp cho 1-2 người</li>
              <li>Giao hàng nhanh chóng</li>
              <li>Chất lượng đảm bảo</li>
            </ul>
          </div>

          {/* Order Section */}
          <OrderSection 
            product={combo} 
            type="combo"
            comboGroupSelections={comboGroupSelections}
          />

          {/* Combo Group Selection */}
          {comboId && (
            <ComboGroupSection
              comboId={comboId}
              onSelectionsChange={setComboGroupSelections}
              formatPrice={formatPrice}
            />
          )}
        </div>
      </div>
    </div>
  );
}
