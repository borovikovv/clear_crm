import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from "../api/AuthService";

import types from "../common/routeTypes";
const {
    ROUTE_PROFILE,
    ROUTE_LOGIN
  } = types;

export const registration = createAsyncThunk(
  'auth/registration',
  async (data) => {
    const { email, password } = data;

    const response = await AuthService.register(email, password);

    return response.data.user.email;
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (data) => {
    const { email, password, history } = data;

    const response = await AuthService.login(email, password);

    localStorage.setItem('token', response.data.accessToken);
    history.push(ROUTE_PROFILE);

    return true;
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (data) => {
    const { history } = data;

    await AuthService.logout();

    localStorage.removeItem('token');
    history.push(ROUTE_LOGIN);
    return false;
  }
)

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async () => {
    const response = await AuthService.checkAuth();

    localStorage.setItem('token', response.data.accessToken);

    return true;
  }
)