import axiosInstance from "./axiosInstance";

export const loginUser = async (username: string, password: string) => {
  try {
    const { data } = await axiosInstance.post("api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const { data } = await axiosInstance.post("/users/register", {
      username,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("Authentication token not found");

  try {
    const { data } = await axiosInstance.get("/users/my-profile", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};
