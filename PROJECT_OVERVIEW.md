# 🍽️ UTE FOOD - Frontend Service Overview

## 📋 Project Summary

**UTE FOOD** is a modern React-based food delivery web application that allows users to browse food items, manage shopping carts, and process orders. The frontend is built with React 19, Redux state management, and Tailwind CSS for styling.

---

## 🏗️ Technology Stack

### Core Framework & Libraries
- **React**: 19.2.0 - Modern UI library with Hooks
- **React Router**: 7.9.6 - Client-side routing
- **Redux**: 5.0.1 + Redux Saga 1.4.2 - State management with side effects
- **React Redux**: 9.2.0 - React bindings for Redux

### UI & Styling
- **Tailwind CSS**: 3.4.18 - Utility-first CSS framework
- **SASS**: 1.94.1 - CSS preprocessor
- **Lucide React**: 0.555.0 - Icon library
- **React Icons**: 5.5.0 - Additional icon sets

### Forms & Validation
- **React Hook Form**: 7.66.1 - Efficient form management
- **Yup**: 1.7.1 - Schema validation
- **@hookform/resolvers**: 5.2.2 - Form validation resolvers

### API & Data
- **Axios**: 1.13.2 - HTTP client
- **jwt-decode**: 4.0.0 - JWT token decoding

### Build Tools
- **Create React App**: 5.0.1
- **Craco**: 7.1.0 - Configuration overrides for CRA
- **PostCSS**: 8.4.47 - CSS transformations
- **AutoPrefixer**: 10.4.20 - CSS vendor prefixes

### Development Tools
- **ESLint**: 8.57.1 - Code linting
- **Prettier**: 3.6.2 - Code formatting
- **Husky**: 9.1.7 - Git hooks
- **Lint-staged**: 15.5.2 - Run linters on staged files

---

## 📁 Project Structure

```
frontend-service-CNPPM/
├── public/                          # Static assets
│   ├── index.html
│   ├── manifest.json
│   └── robots.txt
│
├── src/
│   ├── assets/                      # Static resources
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── scss/                    # Global styles
│   │       └── index.scss
│   │
│   ├── components/                  # Reusable UI components
│   │   ├── AppLoading.jsx           # Loading screen
│   │   ├── AddToCartForm/           # Form for adding items to cart
│   │   │   ├── index.jsx            # Component logic
│   │   │   ├── AddToCartForm.scss   # Styles
│   │   │   └── USAGE_EXAMPLE.md     # Usage documentation
│   │   │
│   │   ├── CartButton/              # Cart icon button
│   │   │   ├── index.jsx
│   │   │   └── CartButton.scss
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── Layout.jsx           # Main app layout (Header + Footer)
│   │   │   ├── Header.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   └── ui/                      # General UI components
│   │       ├── FoodCard.jsx         # Food item card display
│   │       ├── Loading.jsx          # Loading spinner
│   │       └── [other UI components]
│   │
│   ├── constants/                   # App constants
│   │   └── index.js                 # Routes, storage keys, enums
│   │
│   ├── hooks/                       # Custom React hooks
│   │   ├── useAuth.js               # Authentication logic & user state
│   │   ├── useCart.js               # Shopping cart logic
│   │   └── useFetchAction.js        # Generic data fetching
│   │
│   ├── pages/                       # Page components (views)
│   │   ├── About/
│   │   ├── Cart/                    # Shopping cart page
│   │   │   ├── index.jsx            # Cart UI & management
│   │   │   └── Cart.scss            # Cart styling
│   │   │
│   │   ├── ComboDetail/             # Combo package detail page
│   │   ├── Dashboard/               # User dashboard
│   │   ├── FoodDetail/              # Individual food detail page
│   │   ├── Foods/                   # Food listing page
│   │   ├── ForgotPassword/          # Forgot password page
│   │   ├── Home/                    # Landing/home page
│   │   ├── Login/                   # Login page
│   │   ├── NotFound/                # 404 page
│   │   ├── Products/                # Products listing
│   │   ├── Profile/                 # User profile page
│   │   ├── Register/                # User registration page
│   │   ├── ResetPassword/           # Password reset page
│   │   └── Unauthorized/            # 403 Unauthorized page
│   │
│   ├── routes/                      # Routing configuration
│   │   ├── index.jsx                # Main route setup
│   │   ├── publicRoutes.jsx         # Public accessible routes
│   │   ├── privateRoutes.jsx        # Authenticated routes
│   │   ├── adminRoutes.jsx          # Admin routes
│   │   └── RequireAuth.jsx          # Route protection wrapper
│   │
│   ├── services/                    # API services
│   │   ├── api.js                   # Axios instance with interceptors
│   │   ├── cartService.js           # Cart API calls
│   │   ├── userService.js           # Authentication & user API calls
│   │   ├── foodService.js           # Food listing & details API calls
│   │   └── [other services]
│   │
│   ├── store/                       # Redux state management
│   │   ├── index.js                 # Store configuration
│   │   │
│   │   ├── actions/                 # Redux action creators
│   │   │   ├── cartAction.js        # Cart actions (18 types)
│   │   │   ├── authAction.js        # Auth actions
│   │   │   └── appAction.js         # App state actions
│   │   │
│   │   ├── reducers/                # Redux reducers
│   │   │   ├── cartReducer.js       # Cart state logic
│   │   │   ├── authReducer.js       # Auth state logic
│   │   │   └── appReducer.js        # App state logic
│   │   │
│   │   ├── sagas/                   # Redux-Saga side effects
│   │   │   ├── cartSaga.js          # Cart async operations
│   │   │   ├── authSaga.js          # Auth async operations
│   │   │   └── rootSaga.js          # Saga combining
│   │   │
│   │   └── selectors/               # Redux state selectors
│   │       ├── cartSelector.js      # Cart state selectors
│   │       ├── authSelector.js      # Auth state selectors
│   │       └── appSelector.js       # App state selectors
│   │
│   ├── utils/                       # Utility functions
│   │   └── index.js
│   │
│   ├── App.js                       # Root component
│   ├── App.test.js                  # App tests
│   ├── index.js                     # ReactDOM entry point
│   ├── reportWebVitals.js           # Performance monitoring
│   └── setupTests.js                # Jest configuration
│
├── build/                           # Production build output
├── CART_FEATURE_COMPLETE.md         # Cart feature documentation
├── CART_IMPLEMENTATION.md           # Cart implementation guide
├── CART_SUMMARY.md                  # Cart summary
├── craco.config.js                  # Webpack configuration overrides
├── tailwind.config.js               # Tailwind CSS configuration
├── postcss.config.js                # PostCSS configuration
├── package.json                     # Dependencies & scripts
└── README.md                        # CRA default documentation
```

---

## 🔑 Key Features

### 1. **Authentication System**
- User login/registration
- JWT token-based authentication
- Automatic token refresh
- Protected routes (RequireAuth wrapper)
- User profile management

### 2. **Shopping Cart**
- Add items (Food or Combo) to cart
- Customize items with options
- Update item quantities
- Delete individual items
- Clear entire cart
- Real-time cart total calculation
- Persistent cart management

### 3. **Food Catalog**
- Browse food items
- View detailed food information
- Search and filter foods by name/category
- View combo packages
- Display options and pricing

### 4. **User Management**
- View/edit user profile
- Password reset functionality
- User dashboard
- Order history (likely in Dashboard)

### 5. **UI/UX**
- Responsive design (mobile-first)
- Loading states
- Error handling with user-friendly messages
- Success notifications
- Empty states
- Modern Tailwind CSS styling

---

## 🗂️ Core Implementation Details

### Redux Architecture

#### **Store Structure**
```javascript
{
  auth: {
    profile: { id, email, name, permissions, ... },
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null,
    permissions: array
  },
  
  cart: {
    cart: {
      id: string,
      totalPrice: number,
      items: [
        {
          id: string,
          itemId: string,
          itemKind: number, // 1=Food, 2=Combo
          quantity: number,
          basePrice: number,
          note: string,
          options: array,
          comboSelections: array
        }
      ]
    },
    loading: boolean,
    error: string | null,
    success: string | null
  },
  
  app: {
    // App-level state
  }
}
```

#### **Cart Actions (18 types)**
```javascript
// Fetch
FETCH_CART, FETCH_CART_REQUEST, SET_CART, FETCH_CART_FAILURE

// Add to cart
ADD_TO_CART_REQUEST, ADD_TO_CART_SUCCESS, ADD_TO_CART_FAILURE

// Update item
UPDATE_CART_ITEM_REQUEST, UPDATE_CART_ITEM_SUCCESS, UPDATE_CART_ITEM_FAILURE

// Delete item
DELETE_CART_ITEM_REQUEST, DELETE_CART_ITEM_SUCCESS, DELETE_CART_ITEM_FAILURE

// Clear cart
CLEAR_CART_REQUEST, CLEAR_CART_SUCCESS, CLEAR_CART_FAILURE

// Utility
RESET_CART_ERROR
```

#### **Sagas (Async Operations)**
- **fetchCartSaga**: GET `/api/cart/my-cart`
- **addToCartSaga**: POST `/api/cart/add`
- **updateCartItemSaga**: PATCH `/api/cart/update-item`
- **deleteCartItemSaga**: DELETE `/api/cart/item/:id`
- **clearCartSaga**: DELETE `/api/cart/clear`

### API Service Architecture

**Base URL**: `https://backend-service-cnppm.onrender.com`

**Axios Interceptors**:
- **Request**: Adds JWT Authorization header with Bearer token
- **Response**: Handles 401 errors by removing token and redirecting to login

**Services**:
- `cartService.js` - Cart operations
- `userService.js` - User & authentication
- `foodService.js` - Food listings & details
- Additional services for other domains

### Routing Structure

#### **Public Routes**
```
/              - Home page
/login         - Login
/register      - Register
/reset-password - Reset password
/forgot-password - Forgot password
/foods         - Food listing
/foods/:foodId - Food detail
/products      - Products
/combos/:comboId - Combo detail
/about         - About page
```

#### **Private Routes** (require authentication)
```
/cart          - Shopping cart
/dashboard     - User dashboard
/profile       - User profile
```

#### **Protected Routes**
- Wrapped with `RequireAuth` component
- Redirects to login if not authenticated

---

## 🎨 Styling & Theme

### Tailwind Configuration
- **Utility-first CSS framework**
- Custom color palettes for light and dark themes
- Responsive design breakpoints
- Extended theme with custom colors:
  - Primary, Secondary, Accent colors
  - Danger, Warning, Success, Info colors
  - Light & Dark theme variants

### SCSS Modules
- Component-specific styling
- Organized in `assets/scss/`
- Global styles imported in `index.scss`

---

## 🔐 Authentication Flow

1. User logs in via `/login` page
2. Backend returns JWT access token
3. Token stored in localStorage via `userService.js`
4. `useAuth()` hook retrieves token and user profile
5. API requests include Authorization header with token
6. Protected routes check authentication status
7. Invalid/expired tokens trigger redirect to login

---

## 🛒 Shopping Cart Flow

1. **Initialize**: `useCart()` hook calls `fetchCart()` on mount
2. **Add Item**: `AddToCartForm` component dispatches `addToCart` action
3. **Async Operation**: `cartSaga` handles API call to `/api/cart/add`
4. **Update State**: Reducer updates Redux state with new cart
5. **Display**: Cart components re-render with updated data
6. **Manage**: User can update quantities, delete items, or clear cart
7. **Checkout**: Navigate to checkout (implementation not visible)

---

## 🚀 Scripts & Commands

```bash
npm start        # Start development server (port 3000)
npm build        # Build for production
npm test         # Run tests in watch mode
npm run eject    # Eject from CRA (one-way operation)
npm run format   # Format code with Prettier
npm run lint     # Lint and fix with ESLint
```

---

## 📊 Component Hierarchy

```
App
├── AppRoutes
│   └── Routes
│       └── Layout (Header + Footer wrapper)
│           ├── [Public Routes]
│           │   ├── HomePage
│           │   ├── LoginPage
│           │   ├── RegisterPage
│           │   ├── FoodsPage
│           │   ├── FoodDetailPage
│           │   ├── ProductsPage
│           │   ├── ComboDetailPage
│           │   └── AboutPage
│           │
│           ├── RequireAuth [Private Routes]
│           │   ├── CartPage
│           │   ├── DashboardPage
│           │   └── ProfilePage
│           │
│           └── 404 NotFoundPage

App Components:
├── CartButton (Header)
├── AddToCartForm (Food Detail)
├── FoodCard (Listings)
├── Loading (Loading states)
└── [Other UI components]
```

---

## 🔗 API Integration

### Cart Endpoints
| Operation | Method | Endpoint | Status |
|-----------|--------|----------|--------|
| Get My Cart | GET | `/api/cart/my-cart` | ✅ Implemented |
| Add to Cart | POST | `/api/cart/add` | ✅ Implemented |
| Update Item | PATCH | `/api/cart/update-item` | ✅ Implemented |
| Delete Item | DELETE | `/api/cart/item/:id` | ✅ Implemented |
| Clear Cart | DELETE | `/api/cart/clear` | ✅ Implemented |

### Request/Response Format

**Add to Cart Request**:
```javascript
{
  itemId: string,           // Food or Combo ID
  itemKind: number,         // 1=Food, 2=Combo
  quantity: number,         // Min 1
  note?: string,            // Optional special instructions
  optionIds?: string[],     // For Food items only
  comboSelectionFoodIds?: string[] // For Combo items only
}
```

**Cart Response**:
```javascript
{
  id: string,
  totalPrice: number,
  items: [
    {
      id: string,
      itemId: string,
      itemKind: number,
      quantity: number,
      basePrice: number,
      note: string,
      options: [
        {
          id: string,
          optionValue: { id, name, extraPrice },
          extraPrice: number
        }
      ],
      comboSelections: [
        {
          id: string,
          selectedFood: { id, name },
          extraPrice: number
        }
      ]
    }
  ]
}
```

---

## 🛠️ Development Setup

### Installation
```bash
cd frontend-service-CNPPM
npm install
```

### Environment Setup
- Ensure backend is running at `https://backend-service-cnppm.onrender.com`
- Token storage key: `UTE-FOOD-user-access-token`
- Cart storage key: `UTE-FOOD-cart`

### Running
```bash
npm start
# App runs on http://localhost:3000
```

---

## 📝 Notable Code Patterns

### Custom Hooks Pattern
```javascript
// useCart.js - Encapsulates cart logic
const useCart = () => {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  
  const addToCart = useCallback((data) => {
    dispatch(addToCart(data));
  }, [dispatch]);
  
  return { items, addToCart, ... };
};
```

### Selector Pattern
```javascript
// Redux selectors for cleaner state access
export const selectCartItems = (state) => state.cart.cart?.items || [];
```

### Saga Pattern
```javascript
// Side effects handling
function* addToCartSaga(action) {
  yield put({ type: 'REQUEST' });
  const response = yield call(cartService.addToCart, action.payload);
  yield put({ type: 'SUCCESS', payload: response });
}
```

---

## 🐛 Known Features & Considerations

1. **Cart Feature Complete** - Fully implemented with CRUD operations
2. **Authentication** - JWT-based with automatic token handling
3. **Error Handling** - User-friendly error messages and alerts
4. **Loading States** - Loading spinners during async operations
5. **Responsive Design** - Mobile-first approach with Tailwind
6. **Code Quality** - ESLint + Prettier for consistency
7. **Git Hooks** - Pre-commit linting via Husky

---

## 📦 Build Output

Production build in `/build` directory:
- Minified JavaScript & CSS
- Optimized images
- Static assets
- Service worker support
- Ready for deployment to any static host

---

## 🌐 Deployment Ready

The application is configured for production deployment with:
- Environment-based API endpoints
- Build optimization via Craco
- Tailwind CSS purging
- JavaScript minification
- Static asset versioning

---

## 📚 Related Documentation

- [CART_FEATURE_COMPLETE.md](./CART_FEATURE_COMPLETE.md) - Detailed cart implementation
- [CART_IMPLEMENTATION.md](./CART_IMPLEMENTATION.md) - Cart development guide
- [CART_SUMMARY.md](./CART_SUMMARY.md) - Cart summary report
- [AddToCartForm USAGE_EXAMPLE.md](./src/components/AddToCartForm/USAGE_EXAMPLE.md) - Component usage

---

**Last Updated**: January 5, 2026  
**Frontend Framework**: React 19.2.0  
**State Management**: Redux + Redux-Saga  
**Styling**: Tailwind CSS 3.4.18  
**Build Tool**: Create React App with Craco
