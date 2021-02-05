export const GET_SEEKER_JOB_SUCCESS = 'get_seeker_job_success';
export const GET_SEEKER_JOB_ERROR = 'get_seeker_job_error';
export const SEEKER_JOB_RESET = 'seeker_job_reset';
export const GET_SEEKER_PROFILE_SUCCESS = 'get_seeker_profile_success';
export const GET_SEEKER_PROFILE_ERROR = 'get_seeker_profile_error';

export const RESET = 'reset';
const initialState = {
  seekerJobsData: null,
  seekerJobError: null,
  seekerProfileData: null,
  seekerProfileError: null,
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
    case RESET:
      return {...state, seekerProfileError: null};
  }
  return state;
};

export default JobSeekerReducer;
