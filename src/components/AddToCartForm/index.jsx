// src/components/AddToCartForm/index.jsx
import React, { useState } from 'react';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import './AddToCartForm.scss';

/**
 * Component để thêm Food hoặc Combo vào giỏ hàng
 * @param {Object} props
 * @param {string} props.itemId - ID của Food hoặc Combo
 * @param {number} props.itemKind - 1 = Food, 2 = Combo
 * @param {Array} props.availableOptions - Tùy chọn có sẵn (cho Food)
 * @param {Array} props.comboGroups - Combo groups (cho Combo)
 * @param {Function} props.onSuccess - Callback khi thêm thành công
 */
const AddToCartForm = ({
  itemId,
  itemKind = 1,
  availableOptions = [],
  comboGroups = [],
  onSuccess,
}) => {
  const { isAuthenticated } = useAuth();
  const { addToCart, loading, error, success, resetError } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [selectedComboFoods, setSelectedComboFoods] = useState([]);
  const [note, setNote] = useState('');

  const isFood = itemKind === 1;
  const isCombo = itemKind === 2;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      alert('Please login first');
      return;
    }

    const payload = {
      itemId,
      itemKind,
      quantity: Math.max(1, quantity),
      note: note.trim() || undefined,
    };

    if (isFood && selectedOptions.length > 0) {
      payload.optionIds = selectedOptions;
    }

    if (isCombo && selectedComboFoods.length > 0) {
      payload.comboSelectionFoodIds = selectedComboFoods;
    }

    console.log('🛒 Adding to cart with payload:', payload);
    addToCart(payload);

    if (onSuccess) {
      setTimeout(onSuccess, 1500);
    }
  };

  const toggleOption = (optionId) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId]
    );
  };

  const toggleComboFood = (foodId) => {
    setSelectedComboFoods((prev) =>
      prev.includes(foodId)
        ? prev.filter((id) => id !== foodId)
        : [...prev, foodId]
    );
  };

  return (
    <div className="add-to-cart-form">
      {/* Error/Success Messages */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={16} />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="alert alert-success">
          <span>✓ {success}</span>
        </div>
      )}

      {/* Quantity Selection */}
      <div className="form-group">
        <label>Quantity</label>
        <div className="quantity-input">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={loading}
            className="qty-btn"
          >
            −
          </button>
          <input
            type="number"
            min="1"
            max="99"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            disabled={loading}
          />
          <button
            onClick={() => setQuantity(Math.min(99, quantity + 1))}
            disabled={loading}
            className="qty-btn"
          >
            +
          </button>
        </div>
      </div>

      {/* Food Options */}
      {isFood && availableOptions.length > 0 && (
        <div className="form-group">
          <label>Options (Optional)</label>
          <div className="options-list">
            {availableOptions.map((option) => (
              <div key={option.id} className="option-item">
                <input
                  type="checkbox"
                  id={`option-${option.id}`}
                  checked={selectedOptions.includes(option.id)}
                  onChange={() => toggleOption(option.id)}
                  disabled={loading}
                />
                <label htmlFor={`option-${option.id}`} className="option-label">
                  <span className="option-name">{option.name}</span>
                  {option.extraPrice > 0 && (
                    <span className="option-price">
                      +${Number(option.extraPrice).toFixed(2)}
                    </span>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Combo Selections */}
      {isCombo && comboGroups.length > 0 && (
        <div className="form-group">
          <label>Select Items for Combo (Optional)</label>
          <div className="combo-groups">
            {comboGroups.map((group) => (
              <div key={group.id} className="combo-group">
                <h4>{group.name}</h4>
                <div className="combo-items">
                  {group.items?.map((item) => (
                    <div key={item.id} className="combo-item">
                      <input
                        type="checkbox"
                        id={`combo-${item.id}`}
                        checked={selectedComboFoods.includes(item.id)}
                        onChange={() => toggleComboFood(item.id)}
                        disabled={loading}
                      />
                      <label htmlFor={`combo-${item.id}`}>
                        <span>{item.name}</span>
                        {item.extraPrice > 0 && (
                          <span>(+${Number(item.extraPrice).toFixed(2)})</span>
                        )}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Notes */}
      <div className="form-group">
        <label htmlFor="note">Special Instructions (Optional)</label>
        <textarea
          id="note"
          placeholder="e.g., No onions, extra spicy..."
          value={note}
          onChange={(e) => setNote(e.target.value)}
          disabled={loading}
          rows="3"
        />
      </div>

      {/* Submit Button */}
      <button
        className="btn btn-add-to-cart"
        onClick={handleAddToCart}
        disabled={loading || !isAuthenticated}
      >
        <ShoppingCart size={18} />
        {loading ? 'Adding...' : 'Add to Cart'}
      </button>

      {!isAuthenticated && (
        <p className="login-hint">
          💡 Please login to add items to cart
        </p>
      )}
    </div>
  );
};

export default AddToCartForm;
