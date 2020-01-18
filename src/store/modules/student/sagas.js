/* eslint-disable camelcase */
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { updateStudentSuccess, updateStudentFailure } from './actions';

export function* updateStudent({ payload }) {
  try {
    const { provider, name, email, age, weigth, heigth } = payload.data;

    const student = {
      provider,
      name,
      email,
      age,
      weigth,
      heigth,
    };

    const response = yield call(api.put, 'students', student);

    toast.success('Student updated with success!');

    yield put(updateStudentSuccess(response.data));
  } catch (err) {
    toast.error('Failure while update student, please verify his data');
    yield put(updateStudentFailure());
  }
}

export default all([
  takeLatest('@student/UPDATE_STUDENT_SUCCESS', updateStudent),
]);
