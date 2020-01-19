export function updateMatriculationRequest(data) {
  return {
    type: '@matriculation/UPDATE_MATRICULATION_REQUEST',
    payload: { data },
  };
}
