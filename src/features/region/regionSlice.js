import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const FETCH_URL= "http://localhost:8000/regions"

const initialState={
    regions:[],
    status:"idle",
    error:false
}

export const deleteRegion = createAsyncThunk('deleteRegion' ,async (id) => {
    try {
         const response = await axios.delete(`${FETCH_URL}/${id}`)
    
    
    if(response.status === 200){
     console.log(" Region deleted successfully");
    }
         return response.data
    }
    catch (error) {
     console.log(error);
    }
  
});

export const createRegion = createAsyncThunk('createRegion' ,async (region) => {
    try {
         const response = await axios.post(FETCH_URL,region,{ headers:{
             'Content-Type': 'application/json',
         }
    }
    );
    if(response.status === 200){
     console.log("New region created successfully");
    }

         return response.data
    } catch (error) {
     console.log(error);
    }
});

export const updateRegion = createAsyncThunk('updateRegion' ,async (region) => {
    try {
         const response = await axios.put(`${FETCH_URL}/${region.id}`,region,{ headers:{
             'Content-Type': 'application/json',
         }
    }
    );
    if(response.status === 200){
     console.log(" Region Updated successfully");
    }

         return response.data
    } catch (error) {
     console.log(error);
    }
});

export const fetchAllRegions = createAsyncThunk('fetchAllRegions', async () => {
    try{
        const response = await axios.get(FETCH_URL)
        if(response.status===200){
            console.log(response.data);
            return response.data;
        }else{
            throw Error("Fetching regions failed");
        }

       

    }
    catch(error){
        console.error(error);
    }
})

const regionSlice = createSlice({
    name:"regionSlice",
    initialState,
    reducers:{

    },

    extraReducers(builder){
        builder.addCase(fetchAllRegions.pending,(state)=>{
            state.status="loading";
        })
        .addCase(fetchAllRegions.fulfilled,(state,action)=>{
            state.regions = action.payload;
            state.status="success";
        })
        .addCase(fetchAllRegions.rejected,(state,action) =>{
            state.status="failed";
            state.error=action.payload;
         })
         .addCase(createRegion.fulfilled,(state,action) => {
            state.regions=[action.payload,...state.regions];
        })
        .addCase(updateRegion.fulfilled,(state,action) => {
            const updatedRegion = action.payload;
            const filteredRegion = state.regions.filter(region => region.id !== updatedRegion.id);
            state.regions = [updatedRegion,...filteredRegion];
        })
        .addCase(deleteRegion.fulfilled,(state,action) => {
            const deletedRegion = action.payload;
            const filteredRegion = state.regions.filter(region => region.id !== deletedRegion.id);
            state.regions = filteredRegion;
        })

    }

})


export default regionSlice.reducer;
export const getAllRegions = state => state.regions.regions;
export const getStatus = state => state.regions.status;;
export const getError = state => state.regions.error;
export let getRegionById = (state,id) => state.regions.regions.find(region => region.id === id);

