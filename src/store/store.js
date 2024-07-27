import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../components/region/regionSlice";
<<<<<<< HEAD
import menuSlice from "../components/foods/foodSlice"

export const store = configureStore({
    reducer:{
        regions:regionSlice,
        menus:menuSlice
=======


export const store = configureStore({
    reducer:{
        regions:regionSlice
>>>>>>> af2241ba7b2a765d6f840a29feb16e5fd6be1cf9
    }
})