export function updateStudentRequest(student) {
  return {
    type: '@student/UPDATE_STUDENT_REQUEST',
    student,
  };
}

export function updateStudentSuccess(student) {
  return {
    type: '@student/UPDATE_STUDENT_SUCCESS',
    student,
  };
}
