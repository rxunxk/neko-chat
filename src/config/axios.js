import { getCurrentUser } from "../util/utilFunctions";

export const BASE_URL = "http://localhost:2000";
export const IMAGE_BASE_URL =
  "https://api.cloudinary.com/v1_1/dhqzb4ngs/image/upload";

export const getAxiosConfig = () => {
  return {
    headers: {
      Authorization: `Bearer ${getCurrentUser().token}`,
    },
  };
};
