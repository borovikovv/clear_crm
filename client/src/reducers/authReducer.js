import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuth: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
        state.isAuth = action.payload
    }
  }
})

export const { setAuth } = authSlice.actions

export default authSlice.reducer