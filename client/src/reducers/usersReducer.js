import { createSlice } from '@reduxjs/toolkit'
import { getUsers } from "../actions/usersActions";

const initialState = {
  allUsers: []
}

export const usersSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
    .addCase(getUsers.fulfilled, (state, action) => {
      state.allUsers = action.payload;
    })
  }

})

export default usersSlice.reducer