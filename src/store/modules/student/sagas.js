import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';
import history from '../../../services/history';

import { updateStudentRequest } from './actions';

function* editRequest(student) {
  const studentRequest = yield call(api.get, `/students/${student.id}`);

  history.push('/registerstudnet');

  return studentRequest.data;
}

function* editSuccess(student) {
  yield put(updateStudentRequest(student.data));

  toast.success('Student edited with success');

  history.push('/students');
}

export default all([
  takeLatest('@student/UPDATE_STUDENT_REQUEST', editRequest),
  takeLatest('@studnet/UPDATE_STUDENT_SUCCESS', editSuccess),
]);
