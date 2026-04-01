import { api } from "../api";

export const uploadFile = async (file: Blob, endpoint: string) => {
  const formData = new FormData();
  formData.append("banner", file);
  return await api.post(endpoint, formData);
};
