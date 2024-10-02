import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../config/baseURL";

export const login = createAsyncThunk("login", async (loginRequest) => {
  const response = await axios.post(`${USER_URL}/login`, loginRequest, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(response);
  return {
    data: response.data,
    statusCode: response.status,
  };
});

const initialState = {
  user: {},
  roles: [],
  status: "idle",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.status = "idle";
      state.roles = [];
      state.user = {};
      localStorage.clear();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;

        if (statusCode === 200) {
          state.status = data.loginStatus ? "success" : "failed";
          state.roles = data.roles;
          state.user = data.user;
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        state.status = "failed";
      })
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      });
  },
});

export default authSlice.reducer;
export const { logout } = authSlice.actions;
export const getLoginStatus = (state) => state.auth.status;
export const getUser = (state) => state.auth.user;
export const getRoles = (state) => state.auth.roles;
