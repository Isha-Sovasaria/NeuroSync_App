import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',       
  password: '',       
  accessToken: null,  
  refreshToken: null,  
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUsername(state, action) {
      state.username = action.payload;
    },
    setPassword(state, action) {
      state.password = action.payload;
    },
    setTokens(state, action) {
      state.accessToken  = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    clearAuth(state) {
      // reset all fields back to their initial values
      Object.assign(state, initialState);
    },
  },
});

export const { setUsername, setPassword, setTokens, clearAuth } = authSlice.actions;
export default authSlice.reducer;
