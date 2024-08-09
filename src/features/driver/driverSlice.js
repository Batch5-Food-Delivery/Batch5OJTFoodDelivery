import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const FETCH_URL = "http://localhost:8000/driverorders";

const initialState = {
  currentOrders: {
    items: [],
    status: "idle",
    error: false, // 'idle', 'loading', 'succeeded', 'failed'
  },
  completedOrders: {
    items: [],
    status: "idle",
    error: false, // 'idle', 'loading', 'succeeded', 'failed'
  },
};

export const fetchAllCurrentOrders = createAsyncThunk(
  "fetchAllCurrentOrders",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(FETCH_URL);
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Fetching current orders failed");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const driverSlice = createSlice({
  name: "driververSlice",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchAllCurrentOrders.pending, (state) => {
        state.currentOrders.status = "loading";
      })
      .addCase(fetchAllCurrentOrders.fulfilled, (state, action) => {
        state.currentOrders.items = action.payload;
        state.currentOrders.status = "success";
      })
      .addCase(fetchAllCurrentOrders.rejected, (state, action) => {
        state.currentOrders.status = "failed";
        state.currentOrders.error = action.payload;
      });
  },
});

export default driverSlice.reducer;
export const getAllCurrentOrders = (state) => state.driver.currentOrders.items;
export const getCurrentOrderStatus = (state) =>
  state.driver.currentOrders.status;
export const getCurrentOrderError = (state) => state.driver.currentOrders.error;
