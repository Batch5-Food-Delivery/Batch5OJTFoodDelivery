import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../features/region/regionSlice";
import menuSlice from "../features/foods/foodSlice";
import cartSlice from "../components/cart/cartSlice";
import restaurantSlice from "../features/restaurant/restaurantSlice";

export const store = configureStore({
  reducer: {
    regions: regionSlice,
    menus: menuSlice,
    cart: cartSlice,
    restaurants: restaurantSlice,
  },
});
