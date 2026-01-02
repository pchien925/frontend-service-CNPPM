import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import authReducer from './reducers/authReducer';
import authSaga from './sagas/authSaga';
import appReducer from './reducers/appReducer';
import cartReducer from './reducers/cartReducer';

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

// Chạy saga
sagaMiddleware.run(authSaga);

export default store;
