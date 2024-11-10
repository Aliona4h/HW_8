import axiosInstance from "./axiosInstance";

export const fetchExhibits = async (page: number) => {
  try {
    const { data } = await axiosInstance.get("api/exhibits", {
      params: { page },
    });
    return { data: data.data, lastPage: data.lastPage };
  } catch (error) {
    throw error;
  }
};

export const fetchAllExhibits = async () => {
  try {
    const { data } = await axiosInstance.get("api/exhibits");
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const removeExhibit = async (id: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");

  return axiosInstance.delete(`api/exhibits/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const fetchUserPosts = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  try {
    const { data } = await axiosInstance.get("api/exhibits/my-posts", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadExhibit = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Unauthorized");

  return axiosInstance.post("api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
