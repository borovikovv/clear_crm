import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import usersReducer from "./reducers/usersReducer";
import authReducer from './reducers/authReducer';
const middleware = [thunk];

const store = configureStore({
  reducer: {
    users: usersReducer,
    auth: authReducer,
  },
  middleware
});

export default store;