import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../features/region/regionSlice";
import menuSlice from "../features/foods/foodSlice"

export const store = configureStore({
    reducer:{
        regions:regionSlice,
        menus:menuSlice,

 } });
