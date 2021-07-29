import { createSlice } from "@reduxjs/toolkit"
import { registration, login, logout, checkAuth } from "../actions/authActions";

const initialState = {
  isAuth: false,
  userData: {}
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
        state.isAuth = action.payload
    },
    setUser: (state, action) => {
      state.userData = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
    .addCase(registration.fulfilled, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.isAuth = action.payload;
    })
    .addCase(logout.fulfilled, (state, action) => {
      state.userData = {};
      state.isAuth = action.payload;
    })
    .addCase(checkAuth.fulfilled, (state, action) => {
      state.isAuth = action.payload;
    })
  },
})

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;