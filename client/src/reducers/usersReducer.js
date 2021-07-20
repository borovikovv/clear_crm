import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allUsers: null
}

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: (state, action) => {
        state.allUsers = action.payload
    }
  }
})

export const { getUsers } = counterSlice.actions

export default counterSlice.reducer