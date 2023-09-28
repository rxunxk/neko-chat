import axios from "axios";
import { getAxiosConfig, BASE_URL } from "../config/axios";

export const getAllUsers = async () =>
  await axios.get(`${BASE_URL}/api/users/`);

export const searchUsers = async (searchStr) =>
  await axios.get(
    `${BASE_URL}/api/users/search?search=${searchStr}`,
    getAxiosConfig()
  );
