import type UserDetails from '@/types/user-details';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const INITIAL_STATE: UserDetails = {
  id: '',
  name: '',
  email: '',
  userName: '',
};

const USER_DETAILS_SLICE = createSlice({
  name: 'userDetails',
  initialState: INITIAL_STATE,
  reducers: {
    update: (state, action: PayloadAction<UserDetails>) => {
      Object.assign(state, action.payload);
    },
    remove: (state) => {
      Object.assign(state, INITIAL_STATE);
    },
  },
});

export default USER_DETAILS_SLICE.reducer;
export const { remove, update } = USER_DETAILS_SLICE.actions;
