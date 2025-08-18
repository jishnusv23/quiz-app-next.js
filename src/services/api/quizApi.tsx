import { deleteRequest, getRequest, postRequest } from "../../utils/axios";

export const saveQuiz = async (payload: any) => {
  try {
    const res = await postRequest("/quiz/adduiz", payload);
    if (res?.status == 200) {
      return res.data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const saveAnswer = async (payload: any) => {
  try {
    const res = await postRequest("/quiz/addquestion", payload);
    if (res?.status == 200) {
      return res.data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getAllQuiz = async () => {
  try {
    const res = await getRequest("/quiz", {});
    if (res?.status == 200) {
      return res.data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const getSingleQuiz = async (id: any) => {
  try {
    const Id = id.queryKey[1];
    const res = await getRequest(`/quiz/${Id}`, {});
    if (res?.status === 200) {
      return res.data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const updateUserPlayed = async (payload: any) => {
  try {
    const res = await postRequest("/user/",payload);
    if(res?.status===200){
        return res.data
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const userLogin=async(payload:any)=>{
    try{
        const res=await postRequest('/user/login',payload)
        if(res?.status==200){
                return {
                  success: true,
                  payload: res.data,
                };
        }
    }catch(error:any){
        throw new Error(error?.message)
    }
}

export const getCurrentuser = async (id: any) => {
  const quizId = id.queryKey[1];
  try {
    const res = await getRequest(`/user/${quizId}`, {});
    if (res?.status === 200) {
      console.log(res.data);

      return res.data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};

export const deleteQuiz = async (id: any) => {
  try {
    const res = await deleteRequest(`/quiz/${id}`);
    if (res?.status === 200) {
      console.log(res.data);

      return res.data;
    }
  } catch (error: any) {
    throw new Error(error?.message);
  }
};