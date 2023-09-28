import axios from "axios";
import { BASE_URL, getAxiosConfig } from "../config/axios";

export const getChats = async () => {
  return await axios.get(`${BASE_URL}/api/chats/users`, getAxiosConfig());
};

export const openChat = async (data) => {
  return await axios.post(`${BASE_URL}/api/chats/`, data, getAxiosConfig());
};

export const createGC = async (data) => {
  return await axios.post(`${BASE_URL}/api/chats/gc`, data, getAxiosConfig());
};

export const getChat = async (chatId) => {
  return await axios.get(`${BASE_URL}/api/chats/${chatId}`, getAxiosConfig());
};

export const renameGC = async (data) => {
  return await axios.patch(
    `${BASE_URL}/api/chats/gc/rename`,
    data,
    getAxiosConfig()
  );
};

export const removeFromGC = async (data) => {
  return await axios.patch(
    `${BASE_URL}/api/chats/gc/remove`,
    data,
    getAxiosConfig()
  );
};

export const addToGC = async (data) => {
  return await axios.patch(
    `${BASE_URL}/api/chats/gc/add`,
    data,
    getAxiosConfig()
  );
};
