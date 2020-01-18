/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  data: null,
};

export default function student(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@student/UPDATE_STUDENT_REQUEST': {
        draft.push(action.payload.data);
        break;
      }
      default:
    }
  });
}
