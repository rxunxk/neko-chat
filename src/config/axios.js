import { getCurrentUser } from "../util/utilFunctions";

export const BASE_URL = "neko-chat-server.vercel.app";
export const IMAGE_BASE_URL =
  "https://api.cloudinary.com/v1_1/dhqzb4ngs/image/upload";

export const getAxiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getCurrentUser().token}`,
    },
  };
};
