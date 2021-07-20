import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null
}

export const counterSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getAuthUserData: (state, action) => {
        state.userData = action.payload
    }
  }
})

export const { getAuthUserData } = counterSlice.actions

export default counterSlice.reducer