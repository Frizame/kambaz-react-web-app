import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: { attempts: any[] } = {
  attempts: [],
};

const attemptsSlice = createSlice({
  name: "attempts",
  initialState,
  reducers: {
    setAttempts: (state, action) => {
      state.attempts = action.payload;
    },

    addAttempt: (state, { payload: attempt }) => {
      const newAttempt = {
        _id: uuidv4(),
        quizId: attempt.quizId,
        userId: attempt.userId,
        timestamp: new Date().toISOString(),
        answers: attempt.answers,
        score: attempt.score,
      };
      state.attempts = [...state.attempts, newAttempt];
    },

    deleteAttempt: (state, { payload: attemptId }) => {
      state.attempts = state.attempts.filter((a: any) => a._id !== attemptId);
    },
  },
});

export const { setAttempts, addAttempt, deleteAttempt } = attemptsSlice.actions;
export default attemptsSlice.reducer;
