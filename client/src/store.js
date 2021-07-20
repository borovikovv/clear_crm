import { configureStore } from '@reduxjs/toolkit';
import usersReducer from "./reducers/usersReducer";
import authReducer from './reducers/authReducer';

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
});

export default store;