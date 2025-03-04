import { createSlice } from "@reduxjs/toolkit";

const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!storedUser,
    user: storedUser,
    status: "idle",
  },
  reducers: {
    loginRequest: (state) => {
      state.status = "loading";
    },
    loginSuccess: (state, action) => {
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isAuthenticated = true;
      state.user = action.payload;
      state.status = "fulfilled";
    },
    loginFailure: (state) => {
      state.status = "failed";
    },
    logout: (state) => {
      localStorage.removeItem("user");
      state.isAuthenticated = false;
      state.user = null;
      state.status = "idle";
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } =
  authSlice.actions;
export default authSlice.reducer;
