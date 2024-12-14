import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer:{
    products: productReducer,
    auth: authReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;