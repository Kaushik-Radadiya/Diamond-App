export const GET_SEEKER_JOB_SUCCESS = 'get_seeker_job_success';
export const GET_SEEKER_JOB_ERROR = 'get_seeker_job_error';
export const SEEKER_JOB_RESET = 'seeker_job_reset';

export const RESET = 'reset';
const initialState = {
  seekerJobsData: null,
  seekerJobError: null,
};

const JobSeekerReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEEKER_JOB_SUCCESS:
      return {...state, seekerJobsData: action.payload.data};
    case GET_SEEKER_JOB_ERROR:
      return {...state, seekerJobError: action.payload.data};
    case SEEKER_JOB_RESET:
      return {...state, seekerJobError: null};

    case RESET:
      return {...state};
  }
  return state;
};

export default JobSeekerReducer;
