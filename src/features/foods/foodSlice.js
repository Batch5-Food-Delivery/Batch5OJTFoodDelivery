import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const FETCH_URL= "http://localhost:8000/menus"

const initialState={
    menus:[],
    status:"idle",
    error:false
}

export const fetchAllMenus = createAsyncThunk('fetchAllMenus', async () => {
    try{
        const response = await axios.get(FETCH_URL)
        if(response.status===200){
            console.log(response.data);
            return response.data;
        }else{
            throw Error("Fetching menus failed");
        }

       

    }
    catch(error){
        console.error(error);
    }
})

const menuSlice = createSlice({
    name:"menuSlice",
    initialState,
    reducers:{

    },

    extraReducers(builder){
        builder.addCase(fetchAllMenus.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchAllMenus.fulfilled,(state,action)=>{
            state.menus = action.payload;
            state.status="success";
        })
        .addCase(fetchAllMenus.rejected,(state,action) =>{
            state.status="failed";
            state.error=action.error;
         })

    }

})


export default menuSlice.reducer;
export const getAllMenus = state => state.menus.menus;
export const getStatus = state => state.menus.status;;
export const getError = state => state.menus.error;
