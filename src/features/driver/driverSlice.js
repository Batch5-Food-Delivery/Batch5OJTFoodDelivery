import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DRIVER_URL } from "../config/baseURL";
import { token } from "../auth/getToken";

const initialState = {
  currentDeliveries: {
    items: [],
    status: "idle",
    error: false, // 'idle', 'loading', 'succeeded', 'failed'
  },
  completedDeliveries: {
    items: [],
    status: "idle",
    error: false, // 'idle', 'loading', 'succeeded', 'failed'
  },
};

export const fetchAllCurrentDeliveries = createAsyncThunk(
  "fetchAllCurrentDeliveries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${DRIVER_URL}/deliveries`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Fetching current deliveries failed");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const driverSlice = createSlice({
  name: "driverSlice",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchAllCurrentDeliveries.pending, (state) => {
        state.currentDeliveries.status = "loading";
      })
      .addCase(fetchAllCurrentDeliveries.fulfilled, (state, action) => {
        state.currentDeliveries.items = action.payload;
        state.currentDeliveries.status = "success";
      })
      .addCase(fetchAllCurrentDeliveries.rejected, (state, action) => {
        state.currentDeliveries.status = "failed";
        state.currentDeliveries.error = action.payload;
      });
  },
});

export default driverSlice.reducer;
export const getAllCurrentDeliveries = (state) =>
  state.driver.currentDeliveries.items;
export const getCurrentDeliveryStatus = (state) =>
  state.driver.currentDeliveries.status;
export const getCurrentDeliveryError = (state) =>
  state.driver.currentDeliveries.error;
