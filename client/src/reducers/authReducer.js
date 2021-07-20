import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthUserData: (state, action) => {
        state.userData = action.payload
    }
  }
})

export const { getAuthUserData } = authSlice.actions

export default authSlice.reducer