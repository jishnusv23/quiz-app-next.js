import { postRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

export const googleAuthAction = createAsyncThunk(
  "google/auth",
  async (credential: string,{rejectWithValue}) => {
    try {
      const response = await postRequest("/google", { credential });
      if (response?.status === 200 || response?.status === 201) {
        return response.data.payload;
      }
    } catch (error: any) {
      const e: any = error as AxiosError;
    
      return rejectWithValue(error.message);
    }
  }
);
