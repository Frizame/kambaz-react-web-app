import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;
const axiosWithCredentials = axios.create({ withCredentials: true });

export const fetchQuizzesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/course/${courseId}`);
  return data;
};

export const fetchQuizById = async (quizId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const createQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.post(QUIZZES_API, quiz);
  return data;
};

export const updateQuiz = async (quiz: any) => {
  const { data } = await axiosWithCredentials.put(`${QUIZZES_API}/${quiz._id}`, quiz);
  return data;
};

export const deleteQuiz = async (quizId: string) => {
  const { data } = await axiosWithCredentials.delete(`${QUIZZES_API}/${quizId}`);
  return data;
};

export const toggleQuizPublish = async (quizId: string, isPublished: boolean) => {
  const { data } = await axiosWithCredentials.patch(`${QUIZZES_API}/${quizId}/publish`, { isPublished });
  return data;
};

export const addQuestionToQuiz = async (quizId: string, question: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/questions`, question);
  return data;
};

export const updateQuestion = async (question: any) => {
  const { data } = await axiosWithCredentials.put(`${REMOTE_SERVER}/api/questions/${question._id}`, question);
  return data;
};

export const deleteQuestion = async (questionId: string) => {
  const { data } = await axiosWithCredentials.delete(`${REMOTE_SERVER}/api/questions/${questionId}`);
  return data;
};

export const submitAttempt = async (quizId: string, attempt: any) => {
  const { data } = await axiosWithCredentials.post(`${QUIZZES_API}/${quizId}/attempts`, attempt);
  return data;
};

export const getLastAttempt = async (quizId: string, userId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/${userId}`);
  return data;
};

export const getAllAttemptsForUser = async (quizId: string, userId: string) => {
  const { data } = await axiosWithCredentials.get(`${QUIZZES_API}/${quizId}/attempts/${userId}/all`);
  return data;
};
