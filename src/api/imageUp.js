import axios from "axios";
import { IMAGE_BASE_URL } from "../config/axios";

export const uploadImage = async (data) =>
  await axios.post(`${IMAGE_BASE_URL}`, data);
