// src/components/ui/OrderSection.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { addToCart } from '../../store/actions/cartAction';
import styles from './OrderSection.module.css';

export default function OrderSection({ product, food, foodOptions = [], type = 'food' }) {
  // Support both 'product' và 'food' props for flexibility
  const item = product || food;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [orderMessage, setOrderMessage] = useState('');

  // Sử dụng foodOptions từ prop hoặc từ item.options
  const options = foodOptions && foodOptions.length > 0 ? foodOptions : (item?.options || []);

  // Nhóm options theo requirementType
  const requiredOptions = options?.filter(
    (opt) => opt.requirementType === 1
  ) || [];
  const optionalOptions = options?.filter(
    (opt) => opt.requirementType === 0
  ) || [];

  // Xử lý chọn option
  const handleOptionSelect = (foodOptionId, optionValueId, isMultiple) => {
    setSelectedOptions((prev) => {
      const current = prev[foodOptionId] || [];

      if (isMultiple) {
        // Multiple select (checkbox)
        if (current.includes(optionValueId)) {
          return {
            ...prev,
            [foodOptionId]: current.filter((id) => id !== optionValueId),
          };
        } else {
          return {
            ...prev,
            [foodOptionId]: [...current, optionValueId],
          };
        }
      } else {
        // Single select (radio)
        return {
          ...prev,
          [foodOptionId]: [optionValueId],
        };
      }
    });
  };

  // Kiểm tra bắt buộc options đã chọn
  const validateRequired = () => {
    // If there are required options but no option values defined yet (waiting for API),
    // don't block submission - just show warning
    if (requiredOptions.length > 0) {
      const hasAnyOptionValues = requiredOptions.some(
        (opt) => opt.option?.values && opt.option.values.length > 0
      );
      
      // If options are defined in UI, validate them
      if (hasAnyOptionValues) {
        for (const option of requiredOptions) {
          if (!selectedOptions[option.id] || selectedOptions[option.id].length === 0) {
            setOrderMessage(`⚠️ Vui lòng chọn "${option.option.name}"`);
            return false;
          }
        }
      }
    }
    return true;
  };

  // Xử lý đặt mua
  const handleOrder = () => {
    if (!validateRequired()) {
      return;
    }

    const orderData = {
      foodId: item.id,
      foodName: item.name,
      quantity,
      basePrice: item.basePrice,
      totalPrice: item.basePrice * quantity,
      selectedOptions: Object.entries(selectedOptions).map(([optionId, values]) => ({
        optionId,
        values,
      })),
      timestamp: new Date().toISOString(),
    };

    console.log('Order Data:', orderData);
    
    // Dispatch to Redux
    dispatch(addToCart(orderData));
    
    setOrderMessage(`✅ Đã thêm ${quantity} ${item.name} vào giỏ hàng`);
  };

  // Xử lý thêm vào giỏ hàng (tương tự)
  const handleAddToCart = () => {
    handleOrder();
  };

  const formatPrice = (price) => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
    }).format(numPrice);
  };

  return (
    <div className={styles.orderSection}>
      <h3 className={styles.title}>Lựa chọn</h3>

      {/* Required Options */}
      {requiredOptions.length > 0 && (
        <div className={styles.optionGroup}>
          <h4 className={styles.groupTitle}>
            Bắt buộc <span className={styles.required}>*</span>
          </h4>
          {requiredOptions.map((foodOption) => (
            <div key={foodOption.id} className={styles.option}>
              <label className={styles.optionName}>
                {foodOption.option?.name}
                <span className={styles.required}>*</span>
              </label>
              <p className={styles.optionDescription}>
                {foodOption.option?.description}
              </p>

              {/* Radio buttons (single select) */}
              <div className={styles.optionValues}>
                <p className={styles.note}>
                  ⏳ Tùy chọn này chưa có giá trị. Vui lòng chọn trong thực đơn.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Optional Options */}
      {optionalOptions.length > 0 && (
        <div className={styles.optionGroup}>
          <h4 className={styles.groupTitle}>Tùy chọn</h4>
          {optionalOptions.map((foodOption) => (
            <div key={foodOption.id} className={styles.option}>
              <label className={styles.optionName}>
                {foodOption.option?.name}
                {foodOption.maxSelect > 1 && (
                  <span className={styles.selectCount}>
                    (Tối đa {foodOption.maxSelect})
                  </span>
                )}
              </label>
              <p className={styles.optionDescription}>
                {foodOption.option?.description}
              </p>

              {/* Checkboxes (multiple select) */}
              <div className={styles.optionValues}>
                <p className={styles.note}>
                  ⏳ Tùy chọn này chưa có giá trị. Vui lòng chọn trong thực đơn.
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity Selector */}
      <div className={styles.quantitySection}>
        <h4 className={styles.groupTitle}>Số lượng</h4>
        <div className={styles.quantityControl}>
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className={styles.quantityBtn}
            aria-label="Giảm số lượng"
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className={styles.quantityInput}
            aria-label="Số lượng"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className={styles.quantityBtn}
            aria-label="Tăng số lượng"
          >
            <Plus size={18} />
          </button>
        </div>
      </div>

      {/* Total Price */}
      <div className={styles.priceBlock}>
        <span>Tổng cộng:</span>
        <span className={styles.totalPrice}>
          {formatPrice(item.basePrice * quantity)}
        </span>
      </div>

      {/* Order Message */}
      {orderMessage && (
        <div className={styles.message}>
          {orderMessage}
        </div>
      )}

      {/* Action Buttons */}
      <div className={styles.buttonGroup}>
        <button
          onClick={handleAddToCart}
          className={styles.addToCartBtn}
        >
          <ShoppingCart size={20} />
          Thêm vào giỏ
        </button>
        <button
          onClick={handleOrder}
          className={styles.orderBtn}
        >
          Đặt mua ngay
        </button>
      </div>

      {/* Note */}
      <p className={styles.note}>
        💡 Ghi chú: API option values cần được thêm vào. Hiện tại component hỗ
        trợ cấu trúc UI và logic để dễ tích hợp.
      </p>
    </div>
  );
}
