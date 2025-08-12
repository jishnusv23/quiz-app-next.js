import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("❌ Request error:", error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error",error.response?.data||error.message);
    return Promise.reject(error);
  }
);

export const getRequest = (url: any, params: any) => {
  return axiosInstance.get(url, { params });
};

export const deleteRequest = (url: any) => {
  return axiosInstance.delete(url);
};

export const postRequest = (url: any, params: any) => {
  try {
    return axiosInstance.post(url, params);
  } catch (error: any) {
    console.log("something wrong postrequest", error);
  }
};
