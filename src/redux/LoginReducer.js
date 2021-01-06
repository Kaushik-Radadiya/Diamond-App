const initialState = [{loginResponse: null}];

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Login':
      console.log('==========payload==', action.payload.data);
      return [...state, {loginResponse: action.payload.data}];
  }
  return state;
};

export default LoginReducer;
