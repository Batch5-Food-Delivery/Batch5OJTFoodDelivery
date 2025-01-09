import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { USER_URL } from "../config/baseURL";

const loadRoles = () => {
  const roles = localStorage.getItem("roles");
  if (roles === null) {
    return [];
  }
  return JSON.parse(roles);
};

const loadUser = () => {
  const user = localStorage.getItem("user");
  if (user === null) {
    return {};
  }
  return JSON.parse(user);
};

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

export const register = createAsyncThunk(
  "register",
  async (registerRequest) => {
    const response = await axios.post(`${USER_URL}/create`, registerRequest, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    return {
      data: response.data,
      statusCode: response.status,
    };
  }
);

const initialState = {
  user: loadUser(),
  roles: loadRoles(),
  loginStatus: "idle",
  registerStatus: "idle",
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.loginStatus = "idle";
      state.roles = [];
      state.user = {};
      localStorage.clear();
    },
    setRoles: (state, action) => {
      state.roles = action.payload;
      localStorage.setItem("roles", JSON.stringify(action.payload));
    },
    setAvailable: (state, action) => {
      state.user.available = action.payload;
      localStorage.setItem(
        "user",
        JSON.stringify({ ...state.user, available: action.payload })
      );
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;

        if (statusCode === 200) {
          state.loginStatus = data.loginStatus ? "success" : "failed";
          state.roles = data.roles;
          state.user = data.user;
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.id);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("roles", JSON.stringify(data.roles));
        }
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action);
        state.loginStatus = "failed";
      })
      .addCase(login.pending, (state, action) => {
        state.loginStatus = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        const { data, statusCode } = action.payload;

        if (statusCode === 201) {
          state.registerStatus = "success";
          state.user = data;
        }
      })
      .addCase(register.rejected, (state, action) => {
        console.log(action);
        state.registerStatus = "failed";
      })
      .addCase(register.pending, (state, action) => {
        state.registerStatus = "pending";
      });
  },
});

export default authSlice.reducer;
export const { logout, setRoles, setAvailable } = authSlice.actions;
export const getLoginStatus = (state) => state.auth.loginStatus;
export const getRegisterStatus = (state) => state.auth.registerStatus;
export const getUser = (state) => state.auth.user;
export const getRoles = (state) => state.auth.roles;
export const isLoggedIn = (state) => Object.keys(state.auth.user).length > 0;
