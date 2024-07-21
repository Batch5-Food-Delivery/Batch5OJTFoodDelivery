import { configureStore } from "@reduxjs/toolkit";
import regionSlice from "../components/region/regionSlice";


export const store = configureStore({
    reducer:{
        regions:regionSlice
    }
})