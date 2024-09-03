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

export const fetchAllCompletedDeliveriesForDriver = createAsyncThunk(
  "fetchAllCompletedDeliveriesForDriver",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${DRIVER_URL}/deliveries/history`, {
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
  reducers: {
    removeDelivery(state, action) {
      const idToRemove = action.payload;
      state.current.items = state.current.items.filter(
        (item) => item.id !== idToRemove
      );
    },
    resetDeliverySliceStatus(state, action) {
      state.current.status = "idle";
      state.completed.status = "idle";
    },
  },

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
      .addCase(fetchAllCompletedDeliveriesForDriver.pending, (state) => {
        state.completed.status = "loading";
      })
      .addCase(
        fetchAllCompletedDeliveriesForDriver.fulfilled,
        (state, action) => {
          state.completed.items = action.payload;
          state.completed.status = "success";
        }
      )
      .addCase(
        fetchAllCompletedDeliveriesForDriver.rejected,
        (state, action) => {
          state.completed.status = "failed";
          state.completed.error = action.payload;
        }
      )
      .addCase(completeDelivery.fulfilled, (state, action) => {
        state.current.status = "success";
        state.current.items = state.current.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
        state.completed.items.push(action.payload);
      });
  },
});

export default deliverySlice.reducer;
export const { removeDelivery, resetDeliverySliceStatus } =
  deliverySlice.actions;
export const getAllCurrentDeliveries = (state) => state.delivery.current.items;
export const getAllCompletedDeliveries = (state) =>
  state.delivery.completed.items;
export const getCurrentDeliveryStatus = (state) =>
  state.delivery.current.status;
export const getCurrentDeliveryError = (state) => state.delivery.current.error;
