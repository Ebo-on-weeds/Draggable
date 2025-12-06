import { configureStore } from '@reduxjs/toolkit';
import USER_DETAILS from '@store/user-details';

const STORE = configureStore({
  reducer: {
    userDetails: USER_DETAILS,
  },
});

export default STORE;

export type AppSelector = ReturnType<typeof STORE.getState>;
export type AppDispatch = typeof STORE.dispatch;
