/* eslint-disable camelcase */
import { takeLatest, all } from 'redux-saga/effects';

export function updateStudent({ payload }) {
  // console.log('PAYLOAD SAGA: ', payload.data);
  return payload;
}

export default all([
  takeLatest('@student/UPDATE_STUDENT_REQUEST', updateStudent),
]);
