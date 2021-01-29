export const PROVIDER_DASHBORD_SUCCESS = 'provider_dashbord_success';
export const PROVIDER_DASHBORD_ERROR = 'provider_dashbord_error';
export const POST_JOB_SUCCESS = 'post_job_success';
export const POST_JOB_ERROR = 'post_job_error';
export const POST_JOB_RESET = 'post_job_reset';
export const GET_JOB_CATEGORY_SUCCESS = 'get_job_category_success';
export const GET_JOB_CATEGORY_ERROR = 'get_job_category_error';
export const RESET = 'reset';
const initialState = {
  providerDashbordData: null,
  providerDashbordError: null,
  postJobData: null,
  postJobError: null,
  jobcategoryData: null,
  jobcategoryError: null,
};

const JobProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROVIDER_DASHBORD_SUCCESS:
      return {...state, providerDashbordData: action.payload.data};
    case PROVIDER_DASHBORD_ERROR:
      return {...state, providerDashbordError: action.payload.data};
    case POST_JOB_SUCCESS:
      return {...state, postJobData: action.payload.data};
    case POST_JOB_ERROR:
      return {...state, postJobError: action.payload.data};
    case GET_JOB_CATEGORY_SUCCESS:
      return {
        ...state,
        jobcategoryData: action.payload.data,
      };
    case GET_JOB_CATEGORY_ERROR:
      return {
        ...state,
        jobcategoryError: action.payload.data,
      };
    case POST_JOB_RESET:
      return {...state, postJobData: null, postJobError: null};

    case RESET:
      return {...state, providerDashbordError: null, jobcategoryError: null};
  }
  return state;
};

export default JobProviderReducer;
