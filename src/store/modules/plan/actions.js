export function updatePlanRequest(data) {
  return {
    type: '@plan/UPDATE_PLAN_REQUEST',
    payload: { data },
  };
}
