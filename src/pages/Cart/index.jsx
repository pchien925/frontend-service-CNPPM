// src/pages/Cart/index.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import { Trash2, Plus, Minus, ShoppingCart, AlertCircle } from 'lucide-react';
import './Cart.scss';

const CartPage = () => {
  const navigate = useNavigate();
  const {
    items,
    totalPrice,
    loading,
    error,
    success,
    isEmpty,
    updateCartItem,
    deleteCartItem,
    clearCart,
    resetError,
  } = useCart();

  // Reset error sau 3 giây
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(resetError, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, resetError]);

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleDeleteItem(cartItemId);
    } else {
      updateCartItem({
        cartItemId,
        quantity: newQuantity,
      });
    }
  };

  const handleDeleteItem = (cartItemId) => {
    deleteCartItem(cartItemId);
  };

  const handleCheckout = () => {
    if (!isEmpty) {
      navigate('/checkout');
    }
  };

  const calculateItemPrice = (item) => {
    const basePrice = Number(item.basePrice) || 0;
    const optionsPrice = item.options?.reduce((sum, opt) => sum + Number(opt.extraPrice), 0) || 0;
    const comboPrice = item.comboSelections?.reduce((sum, combo) => sum + Number(combo.extraPrice), 0) || 0;
    return (basePrice + optionsPrice + comboPrice) * item.quantity;
  };

  if (loading && items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-loading">
          <div className="spinner"></div>
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Header */}
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="cart-item-count">
            {items.length} item{items.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="alert alert-error">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="alert alert-success">
            <span>{success}</span>
          </div>
        )}

        {isEmpty ? (
          // Empty Cart
          <div className="empty-cart">
            <ShoppingCart size={48} />
            <h2>Your cart is empty</h2>
            <p>Add some delicious items to get started!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate('/foods')}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            {/* Items List */}
            <div className="cart-items">
              <div className="cart-items-header">
                <div className="col-product">Product</div>
                <div className="col-price">Price</div>
                <div className="col-quantity">Quantity</div>
                <div className="col-total">Total</div>
                <div className="col-action">Action</div>
              </div>

              {items.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="col-product">
                    <div className="item-details">
                      <h3>{item.itemKind === 1 ? 'Food' : 'Combo'} #{item.itemId}</h3>
                      {item.note && (
                        <p className="item-note">
                          <span>Note:</span> {item.note}
                        </p>
                      )}
                      {item.options && item.options.length > 0 && (
                        <div className="item-options">
                          <span className="label">Options:</span>
                          <ul>
                            {item.options.map((opt) => (
                              <li key={opt.id}>
                                {opt.optionValue?.name} (+${opt.extraPrice})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.comboSelections && item.comboSelections.length > 0 && (
                        <div className="item-combos">
                          <span className="label">Selections:</span>
                          <ul>
                            {item.comboSelections.map((combo) => (
                              <li key={combo.id}>
                                {combo.selectedFood?.name} (+${combo.extraPrice})
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-price">
                    <span>${Number(item.basePrice).toFixed(2)}</span>
                  </div>

                  <div className="col-quantity">
                    <div className="quantity-control">
                      <button
                        className="btn-qty"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        disabled={loading}
                      >
                        <Minus size={16} />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 0
                          )
                        }
                        min="1"
                        disabled={loading}
                      />
                      <button
                        className="btn-qty"
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        disabled={loading}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="col-total">
                    <span className="price-total">
                      ${calculateItemPrice(item).toFixed(2)}
                    </span>
                  </div>

                  <div className="col-action">
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteItem(item.id)}
                      disabled={loading}
                      title="Remove item"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="cart-summary">
              <div className="summary-section">
                <div className="summary-row">
                  <span>Subtotal:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>To be calculated</span>
                </div>
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary btn-checkout"
                onClick={handleCheckout}
                disabled={loading || isEmpty}
              >
                Proceed to Checkout
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => navigate('/foods')}
              >
                Continue Shopping
              </button>

              <button
                className="btn btn-outline btn-clear"
                onClick={clearCart}
                disabled={loading || isEmpty}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
