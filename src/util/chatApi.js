import axios from "axios";
import { BASE_URL, AXIOS_CONFIG } from "../config/axios";

export const getChats = async () => {
  return await axios.get(`${BASE_URL}/api/chats/`, AXIOS_CONFIG);
};

export const openChat = async (data) => {
  return await axios.post(`${BASE_URL}/api/chats/`, data, AXIOS_CONFIG);
};

export const createGC = async (data) => {
  return await axios.post(`${BASE_URL}/api/chats/gc`, data, AXIOS_CONFIG);
};

export const getChat = async (chatId) => {
  return await axios.get(`${BASE_URL}/api/chats/${chatId}`, AXIOS_CONFIG);
};

export const renameGC = async (data) => {
  return await axios.patch(
    `${BASE_URL}/api/chats/gc/rename`,
    data,
    AXIOS_CONFIG
  );
};

export const removeFromGC = async (data) => {
  return await axios.patch(
    `${BASE_URL}/api/chats/gc/remove`,
    data,
    AXIOS_CONFIG
  );
};

export const addToGC = async (data) => {
  return await axios.patch(`${BASE_URL}/api/chats/gc/add`, data, AXIOS_CONFIG);
};
