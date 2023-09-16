import axios from "axios";

export const getChats = async () =>
  await axios.get("http://localhost:2000/api/chats/");
