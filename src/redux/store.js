import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import billReducer from "./slices/billSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    bills: billReducer,
  },
});
