import axios from "axios";
import { BASE_URL } from "../config/axios";

export const getChats = async () => await axios.get(`${BASE_URL}api/chats/`);
