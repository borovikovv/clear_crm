import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  allUsers: []
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: (state, action) => {
        state.allUsers.push(action.payload)
    }
  }
})

export const { getUsers } = usersSlice.actions

export default usersSlice.reducer