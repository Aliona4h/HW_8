import axiosInstance from "./axiosInstance";

export const addComment = async (exhibitId: string, comment: string) => {
  const { data } = await axiosInstance.post(
    `/api/exhibits/${exhibitId}/comments`,
    {
      text: comment,
    }
  );
  return data;
};

export const fetchComments = async (exhibitId: string) => {
  const { data } = await axiosInstance.get(
    `/api/exhibits/${exhibitId}/comments`
  );
  return data;
};

export const deleteComment = async (exhibitId: string, commentId: string) => {
  const { data } = await axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`
  );
  return data;
};
