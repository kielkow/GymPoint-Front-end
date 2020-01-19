/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  matriculation: null,
};

export default function matriculation(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@matriculation/UPDATE_MATRICULATION_REQUEST': {
        draft.matriculation = action.payload.data;
        break;
      }
      default:
    }
  });
}
