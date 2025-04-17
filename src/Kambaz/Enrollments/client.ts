import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const unenroll = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return response.data;
};

export const enroll = async (userId: string, courseId: string) => {
  const response = await axiosWithCredentials.post(`${ENROLLMENTS_API}`, { userId, courseId });
  console.log(response.data);
  return response.data;
}

export const findEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(ENROLLMENTS_API);
  console.log(data);
  return data;
}