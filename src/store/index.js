import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import authSaga from './sagas/authSaga';
import appReducer from './reducers/appReducer';
import cartReducer from './reducers/cartReducer';
import cartSaga from './sagas/cartSaga';

const rootReducer = combineReducers({
  auth: authReducer,
  app: appReducer,
  cart: cartReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  applyMiddleware(sagaMiddleware)
);

// Chạy sagas
sagaMiddleware.run(authSaga);
sagaMiddleware.run(cartSaga);

export default store;
