import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, action) => {
      state.enrollments = action.payload;
    },

    addEnrollment: (state, { payload: enrollment }) => {
      // const newEnrollment = {
      //   _id: uuidv4(),
      //   user: enrollment.user,
      //   course: enrollment.course,
      // };
      state.enrollments = [...state.enrollments, enrollment] as any;
    },

    deleteEnrollment: (state, { payload: enrollment }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(enrollment.user === e.user && enrollment.course === e.course)
      );
    },
  },
});

export const { addEnrollment, deleteEnrollment, setEnrollments } = enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;
