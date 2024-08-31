import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../features/region/regionSlice";
import menuSlice from "../features/foods/foodSlice";
import cartSlice from "../features/cart/cartSlice";
import restaurantSlice from "../features/restaurant/restaurantSlice";
import authSlice from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    regions: regionSlice,
    menus: menuSlice,
    cart: cartSlice,
    restaurants: restaurantSlice,
    auth: authSlice,
  },
});
