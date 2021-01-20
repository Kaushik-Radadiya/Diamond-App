export const PROVIDER_DASHBORD_SUCCESS = 'provider_dashbord_success';
export const PROVIDER_DASHBORD_ERROR = 'provider_dashbord_error';
export const RESET = 'reset';
const initialState = {
  providerDashbordData: null,
  providerDashbordError: null,
};

const JobProviderReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROVIDER_DASHBORD_SUCCESS:
      return {...state, providerDashbordData: action.payload.data};
    case PROVIDER_DASHBORD_ERROR:
      console.log('======PROVIDER_DASHBORD_ERROR======', action.payload.data);
      return {...state, providerDashbordError: action.payload.data};
    case RESET:
      return {...state, providerDashbordError: null};
  }
  return state;
};

export default JobProviderReducer;
