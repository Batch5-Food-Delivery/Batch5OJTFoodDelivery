import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL= "http://localhost:8000/menus"


const initialState={
    menus:[],
    status:"idle",
    error:false
}

export const fetchAllMenus = createAsyncThunk('fetchAllMenus', async () => {
    try{
        const response = await axios.get(BASE_URL)
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

export const createNewMenu = createAsyncThunk('createNewMenu',async (menu) => {

    try {
        const response = await axios.post(
            BASE_URL,
            menu,
            {
                headers : {
                    'Content-Type':'application/json',
                }
            }
        )
        if(response.status === 200){
            console.log('successfullt requested post')
        }
        return response.data
    } catch (error) {
        console.error(error)
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
         .addCase(createNewMenu.fulfilled,(state,action)=>{
            state.menus = [action.payload,...state.menus]
        })

    }

})


export default menuSlice.reducer;
export const getAllMenus = state => state.menus.menus;
export const getStatus = state => state.menus.status;;
export const getError = state => state.menus.error;
export const getMenuById = (state,menuId) => state.menus.menus.find(p => p.id === Number(menuId))
