// src/store/reducers/cartReducer.js
const initialState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { item } = action.payload;
      const existingItem = state.items.find(
        (cartItem) =>
          cartItem.foodId === item.foodId &&
          JSON.stringify(cartItem.selectedOptions) ===
            JSON.stringify(item.selectedOptions)
      );

      let updatedItems;
      if (existingItem) {
        // Tăng số lượng nếu đã có
        updatedItems = state.items.map((cartItem) =>
          cartItem === existingItem
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        // Thêm mới
        updatedItems = [...state.items, item];
      }

      // Tính tổng
      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'REMOVE_FROM_CART': {
      const { foodId, selectedOptions } = action.payload;
      const updatedItems = state.items.filter(
        (item) =>
          !(
            item.foodId === foodId &&
            JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          )
      );

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'UPDATE_CART_ITEM': {
      const { foodId, selectedOptions, quantity } = action.payload;
      const updatedItems = state.items.map((item) =>
        item.foodId === foodId &&
        JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
          ? {
              ...item,
              quantity,
              totalPrice: item.basePrice * quantity,
            }
          : item
      );

      const totalItems = updatedItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = updatedItems.reduce(
        (sum, item) => sum + item.totalPrice,
        0
      );

      return {
        items: updatedItems,
        totalItems,
        totalPrice,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// Actions
export const addToCart = (item) => ({
  type: 'ADD_TO_CART',
  payload: { item },
});

export const removeFromCart = (foodId, selectedOptions) => ({
  type: 'REMOVE_FROM_CART',
  payload: { foodId, selectedOptions },
});

export const updateCartItem = (foodId, selectedOptions, quantity) => ({
  type: 'UPDATE_CART_ITEM',
  payload: { foodId, selectedOptions, quantity },
});

export const clearCart = () => ({
  type: 'CLEAR_CART',
});
