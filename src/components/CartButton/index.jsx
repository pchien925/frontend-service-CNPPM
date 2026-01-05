// src/components/CartButton/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useCart from '../../hooks/useCart';
import useAuth from '../../hooks/useAuth';
import { ShoppingCart } from 'lucide-react';
import './CartButton.scss';

const CartButton = ({ className = '' }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { items } = useCart();

  const totalItems = items?.length || 0;

  const handleClick = () => {
    if (isAuthenticated) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <button
      className={`cart-button ${className}`}
      onClick={handleClick}
      title={isAuthenticated ? 'View cart' : 'Login to view cart'}
    >
      <ShoppingCart size={24} />
      {totalItems > 0 && (
        <span className="cart-badge">{totalItems}</span>
      )}
    </button>
  );
};

export default CartButton;
