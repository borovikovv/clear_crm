import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allUsers: null
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: (state, action) => {
        state.allUsers = action.payload
    }
  }
})

export const { getUsers } = usersSlice.actions

export default usersSlice.reducer