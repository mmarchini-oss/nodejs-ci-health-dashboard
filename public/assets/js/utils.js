export const API_URL = '/api/jobs';

export const STATUS_COLORS = {
  SUCCESS: 'success',
  UNSTABLE: 'warning',
  FAILURE: 'danger',
  ABORTED: 'grey-light',
  RUNNING: 'info',
};

export const STATUS = ['RUNNING', 'SUCCESS', 'UNSTABLE', 'ABORTED', 'FAILURE'];

export async function fetchJobs() {
  const response = await fetch(API_URL);
  const jsonResponse = await response.json();
  if (!jsonResponse) {
    return [];
  }
  return jsonResponse;
}
