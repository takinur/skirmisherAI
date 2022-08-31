import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

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
      return await authService.getUserDetails(auth.authToken);
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


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.authToken = null;
      state.user = null;
      window.sessionStorage.removeItem('user')
      localStorage.removeItem('authToken')
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
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
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
      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserDetails.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.user = payload;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
