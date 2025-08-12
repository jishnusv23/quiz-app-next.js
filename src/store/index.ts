import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/user";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type TypeDisptach = typeof store.dispatch;
export type TypeState = ReturnType<typeof store.getState>;
