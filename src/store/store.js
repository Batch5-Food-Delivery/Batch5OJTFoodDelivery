import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../components/region/regionSlice";
import menuSlice from "../components/foods/foodSlice"
import cartSlice from "../components/cart/cartSlice";

export const store = configureStore({
    reducer:{
        regions:regionSlice,
        menus:menuSlice,
        cart:cartSlice
    }
})