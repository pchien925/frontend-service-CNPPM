# 🛒 Cart Feature Debugging Guide

## 🐛 Issues Found & Fixed

### **Issue #1: Double Unwrapping Response Data**
**Problem**: 
- The Axios response interceptor in `api.js` already unwraps data: `response => response.data`
- But `cartSaga.js` was trying to access `response.data` again: `payload: response.data || response`
- This caused undefined state and cart not updating

**Files Fixed**:
- `src/store/sagas/cartSaga.js` - All 5 saga functions
- `src/store/sagas/authSaga.js` - fetchProfile function

**Changes Made**:
```javascript
// ❌ BEFORE
const response = yield call(cartService.addToCart, action.payload);
yield put({
  type: cartActions.ADD_TO_CART_SUCCESS,
  payload: response.data || response,  // Wrong! response is already unwrapped
});

// ✅ AFTER
const response = yield call(cartService.addToCart, action.payload);
yield put({
  type: cartActions.ADD_TO_CART_SUCCESS,
  payload: response || {},  // Correct! response is already the data
});
```

---

## 🔍 How to Debug Cart Issues

### **1. Check Browser Console**
Open DevTools (F12) → Console tab to see:
- Network errors from API calls
- Redux action dispatches
- Component logs

Look for:
```
🛒 Adding to cart with payload: {...}  // From AddToCartForm
Failed to add to cart: ...               // From cartSaga
```

### **2. Check Network Tab**
In DevTools → Network tab:
1. Click "Add to Cart" button
2. Look for POST request to `/api/cart/add`
3. Check response:
   - **Status 401**: Token expired/missing → Need to login again
   - **Status 400**: Bad request → Check payload format
   - **Status 500**: Server error → Check backend logs
   - **Status 200**: Success → Check Redux state

### **3. Check Redux State**
Install **Redux DevTools Extension** for Chrome:
1. Open DevTools → Redux tab
2. Look for `SET_CART`, `ADD_TO_CART_SUCCESS` actions
3. Check the state tree under `cart` → `cart` → `items`
4. Verify `items` array contains your added items

### **4. Verify Authentication**
The cart requires user to be logged in. Check:
1. Open DevTools → Application → Local Storage
2. Look for `UTE-FOOD-user-access-token` key
3. If missing or expired → User must login first
4. Token format: Should be a JWT (3 parts separated by dots)

---

## 📊 API Response Format

### **Expected Response Structure**

When you add to cart, the API should return:
```json
{
  "id": "uuid-of-cart",
  "totalPrice": 150000,
  "items": [
    {
      "id": "uuid-of-cart-item",
      "itemId": "food-id-123",
      "itemKind": 1,
      "quantity": 2,
      "basePrice": 75000,
      "note": "No onions",
      "options": [
        {
          "id": "option-id",
          "optionValue": {
            "id": "opt-val-id",
            "name": "Extra cheese",
            "extraPrice": 10000
          },
          "extraPrice": 10000
        }
      ],
      "comboSelections": []
    }
  ]
}
```

⚠️ **If response structure is different**, you need to adjust:
1. The Redux reducer to match the actual structure
2. The selector functions in `cartSelector.js`
3. The Cart page component to display correct data

---

## 🔧 Common Issues & Solutions

### **Issue: "Add to Cart" button doesn't respond**

**Check 1**: Is user authenticated?
```javascript
// In browser console:
localStorage.getItem('UTE-FOOD-user-access-token')
// Should return a token, not null
```

**Solution**: Go to `/login` and login first

---

### **Issue: "Add to Cart" clicks but nothing happens**

**Check 2**: Network error?
```javascript
// Open DevTools → Network tab
// Try adding to cart again
// Look for POST /api/cart/add request
// Check if it fails
```

**Solutions**:
- If **401 error**: Token expired, need to re-login
- If **400 error**: Check payload in console log `🛒 Adding to cart...`
- If **500 error**: Backend issue, check backend logs
- If **no request**: Redux action not dispatching, restart dev server

---

### **Issue: Cart shows empty after adding items**

**Check 3**: Redux state issue?
```javascript
// Install Redux DevTools Extension
// DevTools → Redux tab
// Look for these actions:
// 1. ADD_TO_CART_REQUEST
// 2. ADD_TO_CART_SUCCESS or ADD_TO_CART_FAILURE
// Check the payload in each action
```

**Solutions**:
- If **SET_CART** never appears: Response format is wrong
- If **payload is empty**: Need to adjust saga response handling
- If **cart.items is empty array**: API returned empty response

---

### **Issue: Getting "Failed to add item to cart" error**

**Check 4**: Error message in Redux state
```javascript
// Redux DevTools → state.cart.error
// Check what the actual error message is
```

**Solutions**:
- **"Unauthorized"**: Login required
- **"Item not found"**: Food ID doesn't exist
- **"Validation error"**: Missing required fields in payload
- **"Server error"**: Backend issue

---

## 🛠️ Testing Cart Locally

### **Step-by-Step Test**

1. **Start the app**:
   ```bash
   cd frontend-service-CNPPM
   npm start
   ```

2. **Open DevTools** (F12):
   - Console tab → Clear logs
   - Network tab
   - Redux tab (if extension installed)

3. **Go to Home Page**:
   - See list of foods
   - Click on any food item to view details

4. **Add to Cart**:
   - Fill quantity
   - Click "Add to Cart"
   - **Check Console** → Should see `🛒 Adding to cart with payload: {...}`

5. **Monitor Network**:
   - Request to `POST /api/cart/add` should appear
   - Response status should be **200**
   - Response body should have the cart structure

6. **Check Redux**:
   - In Redux DevTools:
   - Should see `ADD_TO_CART_SUCCESS` action
   - Check `state.cart.cart.items` → Should have 1 item

7. **Check UI**:
   - Cart page should update
   - Header cart badge should show item count
   - Cart total price should update

---

## 🚀 Performance Tips

### **Monitor for Issues**:
1. Redux DevTools → Check action count (shouldn't be excessive)
2. Network tab → Check request times (should be < 1s)
3. Console → Look for warnings/errors

### **Optimize if Slow**:
1. Check backend API response time
2. Reduce Redux logging if too verbose
3. Use React DevTools → Profiler to find slow components

---

## 📝 Redux Action Flow (Detailed)

```
User clicks "Add to Cart"
         ↓
AddToCartForm.handleAddToCart()
         ↓
dispatch(addToCart(payload))
         ↓
Redux action: { type: 'ADD_TO_CART_REQUEST', payload: {...} }
         ↓
cartSaga receives ADD_TO_CART_REQUEST
         ↓
cartService.addToCart(payload) → API call to /api/cart/add
         ↓
API Returns: { id, totalPrice, items: [...] }
         ↓
Axios interceptor unwraps: response.data (which is already the object)
         ↓
cartSaga receives unwrapped response
         ↓
dispatch({ type: 'ADD_TO_CART_SUCCESS', payload: response })
         ↓
cartReducer sets cart state
         ↓
Cart page re-renders with new items
         ↓
useCart() hook reads new state
         ↓
UI updates with new cart items
```

---

## 🔗 Key Files Reference

| File | Purpose |
|------|---------|
| `src/components/AddToCartForm/index.jsx` | Form to add items to cart |
| `src/services/cartService.js` | API calls for cart operations |
| `src/store/sagas/cartSaga.js` | Side effects handling |
| `src/store/reducers/cartReducer.js` | State management |
| `src/store/selectors/cartSelector.js` | State selectors |
| `src/hooks/useCart.js` | Custom hook for cart logic |
| `src/pages/Cart/index.jsx` | Cart display page |
| `src/services/api.js` | Axios instance with interceptors |

---

## 📞 If Still Having Issues

1. **Check Backend Logs**: Ensure `/api/cart/add` endpoint is working
2. **Verify Request Format**: Log the exact payload being sent
3. **Check Response Format**: Log the exact response being received
4. **Test with Postman**: Call API directly with token to verify backend
5. **Clear Cache**: Local storage may have stale data
   ```javascript
   localStorage.clear()
   window.location.reload()
   ```

---

**Last Updated**: January 5, 2026
