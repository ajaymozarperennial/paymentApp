import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};



const auth = createSlice({

  name: 'auth',
  initialState,
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  },
});

const authReducer = auth.reducer;

export const authActions = auth.actions;

export default authReducer;
