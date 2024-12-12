import { configureStore } from "@reduxjs/toolkit";
import productReducer from '../features/products/productsSlice';
import authReducer from '../features/auth/authSlice';

export const store = configureStore({
  reducer:{
    products: productReducer,
    auth: authReducer
  }
})