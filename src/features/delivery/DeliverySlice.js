import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { DRIVER_URL } from "../config/baseURL";
import { token } from "../auth/getToken";

const initialState = {
  current: {
    items: [],
    status: "idle",
    error: false, // 'idle', 'loading', 'succeeded', 'failed'
  },
  completed: {
    items: [],
    status: "idle",
    error: false, // 'idle', 'loading', 'succeeded', 'failed'
  },
};

export const fetchAllCurrentDeliveriesForDriver = createAsyncThunk(
  "fetchAllCurrentDeliveriesForDriver",
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

export const completeDelivery = createAsyncThunk(
  "completeDelivery",
  async (deliveryId, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${DRIVER_URL}/deliveries/complete/${deliveryId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        return response.data;
      } else {
        throw new Error("Cannot complete this delivery");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const deliverySlice = createSlice({
  name: "deliverySlice",
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder
      .addCase(fetchAllCurrentDeliveriesForDriver.pending, (state) => {
        state.current.status = "loading";
      })
      .addCase(
        fetchAllCurrentDeliveriesForDriver.fulfilled,
        (state, action) => {
          state.current.items = action.payload;
          state.current.status = "success";
        }
      )
      .addCase(fetchAllCurrentDeliveriesForDriver.rejected, (state, action) => {
        state.current.status = "failed";
        state.current.error = action.payload;
      })
      .addCase(completeDelivery.fulfilled, (state, action) => {
        state.current.status = "success";
        state.current.items = state.current.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export default deliverySlice.reducer;
export const getAllCurrentDeliveriesForDriver = (state) =>
  state.delivery.current.items;
export const getCurrentDeliveryStatusForDriver = (state) =>
  state.delivery.current.status;
export const getCurrentDeliveryError = (state) => state.delivery.current.error;
