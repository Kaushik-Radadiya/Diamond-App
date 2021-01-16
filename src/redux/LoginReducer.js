export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const RESET = 'reset';
const initialState = {loginResponse: null, loginError: null};

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, loginResponse: action.payload.data};
    case LOGIN_ERROR:
      return {...state, loginError: action.payload.data};
    case RESET:
      return {...state, loginError: null};
  }
  return state;
};

export default LoginReducer;
