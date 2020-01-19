/* eslint-disable camelcase */
import { takeLatest, all } from 'redux-saga/effects';

export function updateMatriculation({ payload }) {
  // console.log('PAYLOAD SAGA: ', payload.data);
  return payload;
}

export default all([
  takeLatest('@plan/UPDATE_MATRICULATION_REQUEST', updateMatriculation),
]);
