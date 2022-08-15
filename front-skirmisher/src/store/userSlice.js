import { createSlice } from "@reduxjs/toolkit";
import {
  getUserDetails,
  registerUser,
  userLogin,
} from "../_helpers/userActions";

//initialize userToken from local storage if it exists
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    //Login user reducer
    [userLogin.pending]: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.userToken = action.payload.userToken;
      state.userInfo = action.payload.userInfo;
    },
    [userLogin.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //Register user
    [registerUser.pending]: (state) => {
      state.loading = true;
      //   state.error = null
      state.success = true; //Registering user is successful.
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false; //Registering user is unsuccessful.
    },
    //Get user details
    [getUserDetails.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getUserDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.userInfo = action.payload;
    },
    [getUserDetails.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default userSlice.reducer;
