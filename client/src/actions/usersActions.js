import { createAsyncThunk } from '@reduxjs/toolkit';
import UserService from "../api/UserService";


export const getUsers = createAsyncThunk(
    'user/getUsers',
    async () => {
      const response = await UserService.getUsers();
  
      return response.data;
    }
)