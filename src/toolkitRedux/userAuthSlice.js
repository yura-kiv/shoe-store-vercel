import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuth: false,
};

const userAuthSlice = createSlice({
  name: "userAuthSlice",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload.user;
      state.isAuth = true;
    },
    logout(state, action) {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export default userAuthSlice.reducer;
export const { login, logout } = userAuthSlice.actions;

export const selectCurrentUser = (state) => state.userAuthSlice.user;
export const selectIsAuthState = (state) => state.userAuthSlice.isAuth;
