import { postRequest } from "@/utils/axios";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const GithubAuthAction=createAsyncThunk(
    'github/auth',
    async(code:string,{rejectWithValue})=>{
        try{
            const response=await postRequest('/github',{code})

        }catch(error){
            return rejectWithValue(error)
        }
    }
)