import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  loading: false,
  data: null,
  error: null,
};

export interface QuizState {
  loading: boolean;
  data: any;
  error: any | null;
}

const quizSlice = createSlice({
  name: "qiuz",
  initialState: INITIAL_STATE,
  reducers: {
    quizCreated: (state: QuizState, action) => {
      state.data = action.payload;
    },
  },
});

export const selectLoading = (state: any) => state.user?.loading;
export const { quizCreated } = quizSlice.actions;
export const quizReducer = quizSlice.reducer;
