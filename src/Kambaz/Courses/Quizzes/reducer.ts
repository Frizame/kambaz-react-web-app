import { createSlice } from "@reduxjs/toolkit";

const initialState: { quizzes: any[] } = {
  quizzes: [],
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },

    addQuiz: (state, { payload: quiz }) => {
      state.quizzes = [...state.quizzes, quiz];
    },

    deleteQuiz: (state, { payload: quizId }) => {
      state.quizzes = state.quizzes.filter((q: any) => q._id !== quizId);
    },

    updateQuiz: (state, { payload: updatedQuiz }) => {
      state.quizzes = state.quizzes.map((q: any) =>
        q._id === updatedQuiz._id ? updatedQuiz : q
      );
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  deleteQuiz,
  updateQuiz
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
