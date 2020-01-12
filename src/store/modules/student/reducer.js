/* eslint-disable no-param-reassign */
import produce from 'immer';

export default function student(state = [], action) {
  switch (action.type) {
    case '@student/UPDATE_STUDENT_SUCCESS': {
      return produce(state, draft => {
        const studentIndex = draft.findIndex(s => s.id === action.id);

        if (studentIndex >= 0) {
          draft[studentIndex] = action.student;
        }
      });
    }
    default:
      return state;
  }
}
