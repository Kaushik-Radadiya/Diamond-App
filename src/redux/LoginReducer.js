const initialState = [];

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'Login':
      console.log('==========payload==', action.payload);
      return [...state, action.payload.data];
  }
  return state;
};

export default LoginReducer;
