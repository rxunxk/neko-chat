import axios from "axios";
import { BASE_URL } from "../config/axios";

export const authUser = async (user) =>
  await axios.post(`${BASE_URL}api/auth/login`, user);
