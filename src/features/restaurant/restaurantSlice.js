import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const FETCH_URL= "http://localhost:8000/restaurant";

const initialState={
    restaurants:[],
    status:"idle",
    error:false

}

export const deleteRestaurant = createAsyncThunk('deleteRestaurant' ,async (id) => {
    try {
         const response = await axios.delete(`${FETCH_URL}/${id}`)
    
    
    if(response.status === 200){
     console.log(" Restaurant deleted successfully");
    }
         return response.data
    }
    catch (error) {
     console.log(error);
    }
  
});

export const updateRestaurnt = createAsyncThunk('updateRestaurant' ,async (restaurant) => {
    try {
         const response = await axios.put(`${FETCH_URL}/${restaurant.id}`,restaurant,{ headers:{
             'Content-Type': 'application/json',
         }
    }
    );
    if(response.status === 200){
     console.log(" Restaurnt Updated successfully");
    }

         return response.data
    } catch (error) {
     console.log(error);
    }
});


export const createRestaurant = createAsyncThunk('createRestaurnt' ,async (restaurnt) => {
    try {
         const response = await axios.post(FETCH_URL,restaurnt,{ headers:{
             'Content-Type': 'application/json',
         }
    }
    );
    if(response.status === 200){
     console.log("New Restaurnt created successfully");
    }

         return response.data
    } catch (error) {
     console.log(error);
    }
});

export const fetchAllRestaurant = createAsyncThunk('fetchAllRestaurant', async () => {
    try{
        const response = await axios.get(FETCH_URL)
        if(response.status===200){
            console.log(response.data);
            return response.data;
        }else{
            throw Error("Fetching Restaurant failed");
        }

       

    }
    catch(error){
        console.error(error);
    }
})

const restaurantSlice = createSlice({
    name:"restaurantSlice",
    initialState,
    reducers:{

    },

    extraReducers(builder){
        builder.addCase(fetchAllRestaurant.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchAllRestaurant.fulfilled,(state,action)=>{
            state.restaurants = action.payload;
            state.status="success";
        })
        .addCase(fetchAllRestaurant.rejected,(state,action) =>{
            state.status="failed";
            state.error=action.payload;
         })
         .addCase(createRestaurant.fulfilled,(state,action) => {
            state.restaurants=[action.payload,...state.restaurants];
        })
        .addCase(updateRestaurnt.fulfilled,(state,action) => {
            const updatedRestaurnt = action.payload;
            const filteredRestaurant = state.restaurants.filter(restaurant => restaurant.id !== updatedRestaurnt.id);
            state.restaurants = [updatedRestaurnt,...filteredRestaurant];
        })
        .addCase(deleteRestaurant.fulfilled,(state,action) => {
            const deletedRestaurant = action.payload;
            const filterRes = state.restaurants.filter(res => res.id !== deletedRestaurant.id);
            state.restaurants = filterRes;
        })

    }

})


export default restaurantSlice.reducer;
export const getAllRestaurant = state => state.restaurants.restaurants;
export const getStatus = state => state.restaurants.status;;
export const getError = state => state.restaurants.error;
export let getRestaurntById = (state,id) => state.restaurants.restaurants.find(res => res.id === id);
