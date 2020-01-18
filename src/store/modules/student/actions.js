export function updateStudentRequest(data) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    payload: { data },
  };
}

export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    payload: { student },
  };
}

export function updateStudentFailure() {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
  };
}
