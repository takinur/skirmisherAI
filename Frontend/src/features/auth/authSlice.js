import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import jwtDecode from "jwt-decode";
import { axiosInstance } from "../../_helpers/axiosInstance";
import axios from "axios";

// initialize userToken from local storage
const authToken = localStorage.getItem("authToken")
  ? JSON.parse(localStorage.getItem("authToken"))
  : null;
// initialize user from local storage
const user = window.sessionStorage.getItem("user")
  ? JSON.parse(window.sessionStorage.getItem("user"))
  : null;

const initialState = {
  user,
  authToken,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.register(user);
    } catch (error) {
      if (error.response && error.response.data) {
        // Return first error message
        let err = error.response.data;

        if (err.non_field_errors) {
          err = err.non_field_errors;
        } else if (err.email) {
          err = err.email;
        }

        return rejectWithValue(err[0]);
      } else {
        return rejectWithValue(error.message || "Something went wrong");
      }
    }
  }
);
// Login user
export const login = createAsyncThunk(
  "auth/login",
  async (user, { rejectWithValue }) => {
    try {
      return await authService.login(user);
    } catch (error) {
      console.log(error);
      //Return error message if any
      const message =
        (error.response && error.response.data && error.response.data.detail) ||
        error.message ||
        error.toString();

      return rejectWithValue(message);
    }
  }
);

//User info
export const getUserDetails = createAsyncThunk(
  "auth/getUserDetails",
  async (arg, { getState, thunkAPI }) => {
    try {
      // get user data from store
      const { auth } = getState();
      const data =  await authService.getUserDetails(auth.authToken);      
      return data
    } catch (error) {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Logout 
export const logout = createAsyncThunk('auth/logout', async () => {
  await authService.logout()
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authToken = payload;
      })
      .addCase(register.rejected, (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.authToken = payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.user = null;
        state.authToken = null;
      })
      .addCase(getUserDetails.pending, (state, {payload}) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(getUserDetails.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.authToken = null;
      })
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
