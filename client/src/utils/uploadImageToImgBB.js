import axios from "axios";

const uploadImageToImgBB = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  const apiKey = import.meta.env.VITE_imageBB_api_key;
  const url = `https://api.imgbb.com/1/upload?key=${apiKey}`;
  const res = await axios.post(url, formData);
  if (res.data.success) {
    return res.data.data.url;
  }
  throw new Error("Image Upload Failed");
};

export default uploadImageToImgBB;
