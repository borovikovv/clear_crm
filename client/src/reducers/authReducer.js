import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import AuthService from "../api/AuthService";

export const registration = createAsyncThunk(
  'auth/registration',
  async (data, thunkAPI) => {
    const { email, password } = data;

    const response = await AuthService.register(email, password);

    return response.data.user.email;
  }
)

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
    builder.addCase(registration.fulfilled, (state, action) => {
      state.userData = action.payload;
    })
  },
})

export const { setAuth, setUser } = authSlice.actions;

export default authSlice.reducer;