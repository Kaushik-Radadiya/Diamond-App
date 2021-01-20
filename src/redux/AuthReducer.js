export const LOGIN_SUCCESS = 'login_success';
export const LOGIN_ERROR = 'login_error';
export const REGISTER_SUCCESS = 'register_success';
export const REGISTER_ERROR = 'register_error';
export const RESET = 'reset';
const initialState = {
  loginResponse: null,
  loginError: null,
  registerResponse: null,
  registerError: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {...state, loginResponse: action.payload.data};
    case LOGIN_ERROR:
      return {...state, loginError: action.payload.data};
    case REGISTER_SUCCESS:
      return {...state, registerResponse: action.payload.data};
    case REGISTER_ERROR:
      return {...state, registerError: action.payload.data};
    case RESET:
      return {...state, loginError: null, registerError: null};
  }
  return state;
};

export default AuthReducer;
