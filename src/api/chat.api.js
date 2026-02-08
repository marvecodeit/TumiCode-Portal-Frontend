import api from "./axios";

export const fetchChatMessages = async () => {
  const res = await api.get("/chat");
  return res.data;
};