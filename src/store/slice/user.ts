import { createSlice } from "@reduxjs/toolkit";
import { googleAuthAction } from "../action/auth/GoogleAuth";

const INITIAL_STATE = {
  isAuthenticated: false,
  loading: false,
  data: null,
  error: null,
  isAdmin: false,
};

export interface UserState {
  isAuthenticated: boolean;
  loading: boolean;
  data: any;
  error: any | null;
  isAdmin: boolean;
}

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    loginSuccess: (state: UserState, action) => {
      state.isAdmin = action.payload.isAdmin;
      state.data = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state: UserState) => {
      state.isAuthenticated = false;
      state.data = null;
      state.isAdmin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(googleAuthAction.pending, (state: UserState) => {
        state.loading = true;
      })
      .addCase(googleAuthAction.fulfilled, (state: UserState, action) => {
      
        state.loading = false;
        state.isAuthenticated = true;
        action.payload.isAdmin ? (state.isAdmin = true) : "";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(googleAuthAction.rejected, (state: UserState, action) => {
        (state.loading = false), (state.error = action.error.message);
        state.data = null;
      });
  },
});

export const selectLoading = (state: any) => state.user?.loading;
export const setAuth = (state: any) => state.user?.isAuthenticated;
export const currentUser = (state: any) => state.user;

export const { loginSuccess, logoutUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
