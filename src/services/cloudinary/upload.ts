import axios from "axios";

export const ImageUpload = async (image: any) => {
  try {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "application"); 

    if (image) {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dpsdh1cq9/image/upload",
        data,
        {
          withCredentials: false,
        }
      );

      const { url } = res.data;
      return url;
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
  }
};
