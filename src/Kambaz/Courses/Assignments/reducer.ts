import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState: { assignments: any } = {
  assignments: [],
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    setAssignments: (state, action) => {
      state.assignments = action.payload;
    },

    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        title: assignment.title,
        course: assignment.course,
        description: assignment.description,
        points: assignment.points,
        due: assignment.due,
        from: assignment.from,
        to: assignment.to
      };
      state.assignments = [...state.assignments, newAssignment];
    },

    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },

    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === updatedAssignment._id ? updatedAssignment : a
      );
    },
  },
});

export const { addAssignment, deleteAssignment, updateAssignment, setAssignments } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;