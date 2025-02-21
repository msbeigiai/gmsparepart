import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from "../features/products/productsSlice";
import authReducer from "../features/auth/authSlice";
import cartReducer from "../features/cart/cartSlice";
import localCartReducer from "../features/cart/localCartSlice";
import addressReducer from "../features/address/addressSlice";
import reviewReducer from "../features/review/reviewSlice";
import favoriteReducer from "../features/favorite/favoriteSlice";
import categoryReducer from "../features/category/categorySlice";
import userReducer from "../features/user/userSlice";
import orderReducer from "../features/order/orderSlice";
import uploadReducer from "../features/products/uploadSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    auth: authReducer,
    carts: cartReducer,
    localCart: localCartReducer,
    addresses: addressReducer,
    reviews: reviewReducer,
    favorites: favoriteReducer,
    categories: categoryReducer,
    users: userReducer,
    order: orderReducer,
    upload: uploadReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
