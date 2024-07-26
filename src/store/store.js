import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../components/region/regionSlice";
import menuSlice from "../components/foods/foodSlice"

export const store = configureStore({
    reducer:{
        regions:regionSlice,
        menus:menuSlice
    }
})