import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const BASE_URL= "http://localhost:8686/food"
const FETCH_URL = `${BASE_URL}/all`
const CREATE_URL = `${BASE_URL}/create`
const UPDATE_URL = `${BASE_URL}/update`


const initialState={
    menus:[],
    status:"idle",
    error:null
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

export const createNewMenu = createAsyncThunk('createNewMenu',async (food) => {

    try {
        const response = await axios.post(
            CREATE_URL,
            food,
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

export const updateMenu = createAsyncThunk('updateMenu',async (menu) => {

    try {
        const response = await axios.put(
            UPDATE_URL,
            menu,
            {
                headers : {
                    'Content-Type':'application/json',
                }
            }
        )
        if(response.status === 200){
            console.log('successfullt successfully updated')
        }
        return response.data
    } catch (error) {
        console.error(error)
    }
  
})

export const deleteFood = createAsyncThunk('deleteFood',async (menuId) => {

    try {
        const response = await axios.delete(
            `${BASE_URL}/${menuId}/delete`,
            
            
        )
        if(response.status === 200){
            console.log(' successfully deleted')
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
        .addCase(updateMenu.fulfilled,(state,action) =>{
            const updatedMenu = action.payload
            const filteredMenus = state.menus.filter(p => p.id !== updatedMenu.id)
            state.menus = [updatedMenu,...filteredMenus]
        })
        .addCase(deleteFood.fulfilled,(state,action) => {
            const deletedId = action.payload
            const filteredFoods = state.menus.filter(p => p.id !== deletedId)
            state.menus = filteredFoods
        })

    }

})


export default menuSlice.reducer;
export const getAllMenus = state => state.menus.menus;
export const getStatus = state => state.menus.status;;
export const getError = state => state.menus.error;
export const getMenuById = (state,menuId) => state.menus.menus.find(menu => menu.id === Number(menuId))

