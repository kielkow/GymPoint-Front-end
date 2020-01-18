/* eslint-disable no-param-reassign */
import produce from 'immer';

const INITIAL_STATE = {
  plan: null,
};

export default function plan(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@plan/UPDATE_PLAN_REQUEST': {
        draft.plan = action.payload.data;
        break;
      }
      default:
    }
  });
}
