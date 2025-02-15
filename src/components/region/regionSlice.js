import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const FETCH_URL= "http://localhost:8000/regions"

const initialState={
    regions:[],
    status:"idle",
    error:false
}

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
            state.error=action.error;
         })

    }

})


export default regionSlice.reducer;
export const getAllRegions = state => state.regions.regions;
export const getStatus = state => state.regions.status;;
export const getError = state => state.regions.error;
