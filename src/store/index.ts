import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/user";
import { quizReducer } from "./slice/quiz";

export const store = configureStore({
  reducer: {
    user: userReducer,
    quiz:quizReducer
  },
});

export type TypeDisptach = typeof store.dispatch;
export type TypeState = ReturnType<typeof store.getState>;
