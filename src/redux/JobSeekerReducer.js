export const GET_SEEKER_JOB_SUCCESS = 'get_seeker_job_success';
export const GET_SEEKER_JOB_ERROR = 'get_seeker_job_error';
export const SEEKER_JOB_RESET = 'seeker_job_reset';
export const GET_SEEKER_PROFILE_SUCCESS = 'get_seeker_profile_success';
export const GET_SEEKER_PROFILE_ERROR = 'get_seeker_profile_error';
export const GET_SEEKER_APPLIED_JOB_SUCCESS = 'get_seeker_applied_job_success';
export const GET_SEEKER_APPLIED_JOB_ERROR = 'get_seeker_applied_job_error';
export const GET_SEEKER_SAVED_JOB_SUCCESS = 'get_seeker_saved_job_success';
export const GET_SEEKER_SAVED_JOB_ERROR = 'get_seeker_saved_job_error';
export const GET_SEEKER_FREELANCE_JOB_SUCCESS =
  'get_seeker_freelance_job_success';
export const GET_SEEKER_FREELANCE_JOB_ERROR = 'get_seeker_freelance_job_error';
export const SEEKER_RESET = 'seeker_reset';

const initialState = {
  seekerJobsData: null,
  seekerJobError: null,
  seekerProfileData: null,
  seekerProfileError: null,
  appliedJobsData: null,
  appliedJobsError: null,
  savedJobsError: null,
  savedJobsData: null,
  freelannceJobsData: null,
  freelanceJobsError: null,
};

const JobSeekerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEEKER_JOB_SUCCESS:
      return {...state, seekerJobsData: action.payload.data};
    case GET_SEEKER_JOB_ERROR:
      return {...state, seekerJobError: action.payload.data};
    case SEEKER_JOB_RESET:
      return {...state, seekerJobError: null};

    case GET_SEEKER_PROFILE_SUCCESS:
      return {...state, seekerProfileData: action.payload.data};
    case GET_SEEKER_PROFILE_ERROR:
      return {...state, seekerProfileError: action.payload.data};
    case GET_SEEKER_APPLIED_JOB_SUCCESS:
      return {...state, appliedJobsData: action.payload.data};
    case GET_SEEKER_APPLIED_JOB_ERROR:
      return {...state, appliedJobsError: action.payload.data};
    case GET_SEEKER_SAVED_JOB_SUCCESS:
      return {...state, savedJobsData: action.payload.data};
    case GET_SEEKER_SAVED_JOB_ERROR:
      return {...state, savedJobsError: action.payload.data};
    case GET_SEEKER_FREELANCE_JOB_SUCCESS:
      return {...state, freelannceJobsData: action.payload.data};
    case GET_SEEKER_FREELANCE_JOB_ERROR:
      return {...state, freelanceJobsError: action.payload.data};
    case SEEKER_RESET:
      return {
        ...state,
        seekerProfileError: null,
        appliedJobsError: null,
        savedJobsError: null,
        freelanceJobsError: null,
      };
  }
  return state;
};

export default JobSeekerReducer;
