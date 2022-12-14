import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profileName: '',
};



const profileName = createSlice({

  name: 'profile',
  initialState,
  reducers: {
    profileName(state, action) {
      state.profileName = action.payload; 
    }
  },
});

const profileNameReducer = profileName.reducer;

export const profileNameActions = profileName.actions;

export default profileNameReducer;
