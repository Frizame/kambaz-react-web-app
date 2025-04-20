import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";
import enrollmentsReducer from "./Enrollments/reducer";
import quizzesReducer from "./Courses/Quizzes/reducer";
import attemptsReducer from "./Courses/Quizzes/Attempts/reducer";
import questionsReducer from "./Courses/Quizzes/Questions/reducer";
const store = configureStore({
  reducer: {
    modulesReducer,
    accountReducer,
    assignmentsReducer,
    enrollmentsReducer,
    quizzesReducer,
    attemptsReducer,
    questionsReducer
  },
});
export default store;
