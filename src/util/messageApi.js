import axios from "axios";
import { BASE_URL, getAxiosConfig } from "../config/axios";

export const sendMessage = async (data) => {
  return await axios.post(`${BASE_URL}/api/message`, data, getAxiosConfig());
};

export const getAllMessages = async (chatId) => {
  return await axios.get(`${BASE_URL}/api/message/${chatId}`, getAxiosConfig());
};
