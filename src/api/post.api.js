import api from "./axios";

export const getPosts = () => api.get("/posts");

export const createPost = (data) => api.post("/posts", data);

export const deletePost = (id) => api.delete(`/posts/${id}`);

export const updatePost = (id, data) => api.put(`/posts/${id}`, data);

/* ================= IMAGE UPLOAD ================= */
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append("image", file); // must match backend field

  return api.post("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/* ================= AUDIO UPLOAD ================= */
export const uploadAudio = (formData) => {
  return api.post("/upload/audio", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
