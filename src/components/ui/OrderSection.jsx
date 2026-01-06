// src/components/ui/OrderSection.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Plus, Minus, ShoppingCart } from 'lucide-react';
import { addToCart } from '../../store/actions/cartAction';
import { getOptionValues } from '../../services/optionService';
import styles from './OrderSection.module.css';

export default function OrderSection({ product, food, foodOptions = [], type = 'food' }) {
  // Support both 'product' và 'food' props for flexibility
  const item = product || food;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [orderMessage, setOrderMessage] = useState('');
  const [optionValuesMap, setOptionValuesMap] = useState({});
  const [loadingOptions, setLoadingOptions] = useState(true);

  // Sử dụng foodOptions từ prop hoặc từ item.options
  const options = foodOptions && foodOptions.length > 0 ? foodOptions : (item?.options || []);

  // Nhóm options theo requirementType
  const requiredOptions = options?.filter(
    (opt) => opt.requirementType === 1
  ) || [];
  const optionalOptions = options?.filter(
    (opt) => opt.requirementType === 0
  ) || [];

  // Fetch option values khi component mount hoặc options thay đổi
  useEffect(() => {
    const fetchOptionValues = async () => {
      setLoadingOptions(true);
      const map = {};

      try {
        for (const foodOption of options) {
          try {
            // Pass foodOption.option.id (không phải foodOption.id)
            const response = await getOptionValues(foodOption.option.id);
            map[foodOption.id] = response.data?.content || [];
          } catch (error) {
            console.error(`Failed to fetch option values for ${foodOption.id}:`, error);
            map[foodOption.id] = [];
          }
        }
        setOptionValuesMap(map);
      } finally {
        setLoadingOptions(false);
      }
    };

    if (options.length > 0) {
      fetchOptionValues();
    } else {
      setLoadingOptions(false);
    }
  }, [options]);

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

  // Tính giá trị thêm từ các tùy chọn được chọn
  const calculateExtraPrice = () => {
    let extraPrice = 0;

    for (const foodOptionId in selectedOptions) {
      const selectedValueIds = selectedOptions[foodOptionId];
      
      selectedValueIds.forEach((valueId) => {
        const values = optionValuesMap[foodOptionId] || [];
        const value = values.find((v) => v.id === valueId);
        if (value) {
          extraPrice += Number(value.extraPrice) || 0;
        }
      });
    }

    return extraPrice;
  };

  // Tính tổng giá (giá gốc + giá thêm) * số lượng
  const calculateTotalPrice = () => {
    const basePrice = Number(item.basePrice) || 0;
    const extraPrice = calculateExtraPrice();
    const pricePerItem = basePrice + extraPrice;
    return pricePerItem * Math.max(1, quantity);
  };
  const validateRequired = () => {
    for (const option of requiredOptions) {
      const optionValues = optionValuesMap[option.id];
      
      // Nếu có option values được load, bắt buộc phải chọn
      if (optionValues && optionValues.length > 0) {
        if (!selectedOptions[option.id] || selectedOptions[option.id].length === 0) {
          setOrderMessage(`⚠️ Vui lòng chọn "${option.option.name}"`);
          return false;
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

    // Flatten selectedOptions vào một mảng optionIds
    const optionIds = [];
    for (const foodOptionId in selectedOptions) {
      const selectedValueIds = selectedOptions[foodOptionId];
      optionIds.push(...selectedValueIds);
    }

    // Payload phải match với API requirement
    const cartPayload = {
      itemId: String(item.id),           // ✅ Phải là string
      itemKind: 1,                       // ✅ 1 = Food, 2 = Combo
      quantity: Math.max(1, quantity),
      note: orderMessage.trim() || undefined,
      optionIds: optionIds.length > 0 ? optionIds : undefined,
    };

    console.log('🛒 Add to Cart Payload:', cartPayload);
    
    // Dispatch to Redux
    dispatch(addToCart(cartPayload));
    
    setOrderMessage(`✅ Đã thêm ${quantity} ${item.name} vào giỏ hàng`);

    // Reset form sau 2s
    setTimeout(() => {
      setOrderMessage('');
      setQuantity(1);
      setSelectedOptions({});
    }, 2000);
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
          {requiredOptions.map((foodOption) => {
            const values = optionValuesMap[foodOption.id] || [];
            const isMultiple = foodOption.maxSelect > 1;
            
            return (
              <div key={foodOption.id} className={styles.option}>
                <label className={styles.optionName}>
                  {foodOption.option?.name}
                  <span className={styles.required}>*</span>
                </label>
                <p className={styles.optionDescription}>
                  {foodOption.option?.description}
                </p>

                {/* Render option values */}
                <div className={styles.optionValues}>
                  {loadingOptions ? (
                    <p className={styles.note}>⏳ Đang tải...</p>
                  ) : values.length === 0 ? (
                    <p className={styles.note}>
                      ⏳ Tùy chọn này chưa có giá trị. Vui lòng chọn trong thực đơn.
                    </p>
                  ) : (
                    <div className={styles.valuesContainer}>
                      {values.map((value) => (
                        <label key={value.id} className={styles.valueItem}>
                          <input
                            type={isMultiple ? 'checkbox' : 'radio'}
                            name={`option-${foodOption.id}`}
                            value={value.id}
                            checked={
                              selectedOptions[foodOption.id]?.includes(value.id) || false
                            }
                            onChange={() =>
                              handleOptionSelect(
                                foodOption.id,
                                value.id,
                                isMultiple
                              )
                            }
                          />
                          <span className={styles.valueName}>
                            {value.name}
                            {value.extraPrice > 0 && (
                              <span className={styles.extraPrice}>
                                (+{formatPrice(value.extraPrice)})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Optional Options */}
      {optionalOptions.length > 0 && (
        <div className={styles.optionGroup}>
          <h4 className={styles.groupTitle}>Tùy chọn</h4>
          {optionalOptions.map((foodOption) => {
            const values = optionValuesMap[foodOption.id] || [];
            const isMultiple = foodOption.maxSelect > 1;
            
            return (
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

                {/* Render option values */}
                <div className={styles.optionValues}>
                  {loadingOptions ? (
                    <p className={styles.note}>⏳ Đang tải...</p>
                  ) : values.length === 0 ? (
                    <p className={styles.note}>
                      ⏳ Tùy chọn này chưa có giá trị. Vui lòng chọn trong thực đơn.
                    </p>
                  ) : (
                    <div className={styles.valuesContainer}>
                      {values.map((value) => (
                        <label key={value.id} className={styles.valueItem}>
                          <input
                            type={isMultiple ? 'checkbox' : 'radio'}
                            name={`option-${foodOption.id}`}
                            value={value.id}
                            checked={
                              selectedOptions[foodOption.id]?.includes(value.id) || false
                            }
                            onChange={() =>
                              handleOptionSelect(
                                foodOption.id,
                                value.id,
                                isMultiple
                              )
                            }
                          />
                          <span className={styles.valueName}>
                            {value.name}
                            {value.extraPrice > 0 && (
                              <span className={styles.extraPrice}>
                                (+{formatPrice(value.extraPrice)})
                              </span>
                            )}
                          </span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
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
          {formatPrice(calculateTotalPrice())}
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
    </div>
  );
}
