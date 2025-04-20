import { createSlice } from "@reduxjs/toolkit";

const initialState: { questions: any[] } = {
  questions: [],
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    addQuestion: (state, { payload: question }) => {
      const newQuestion = {
        _id: question._id,
        quizId: question.quizId,
        title: question.title,
        type: question.type,
        question: question.question,
        choices: question.choices || [],
        correctAnswer: question.correctAnswer || [],
        points: question.points,
      };
      state.questions = [...state.questions, newQuestion];
    },

    deleteQuestion: (state, { payload: questionId }) => {
      state.questions = state.questions.filter((q: any) => q._id !== questionId);
    },

    updateQuestion: (state, { payload: updatedQuestion }) => {
      state.questions = state.questions.map((q: any) =>
        q._id === updatedQuestion._id ? updatedQuestion : q
      );
    },
  },
});

export const {
  setQuestions,
  addQuestion,
  deleteQuestion,
  updateQuestion,
} = questionsSlice.actions;
export default questionsSlice.reducer;
