import {createStore, applyMiddleware, combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import JobProviderReducer from './JobProviderReducer';
import JobSeekerReducer from './JobSeekerReducer';
import thunk from 'redux-thunk';

export const RESET_REDUCER = 'reset_reducer';

const appReducer = combineReducers({
  auth: AuthReducer,
  jobProvider: JobProviderReducer,
  jobSeeker: JobSeekerReducer,
});

const rootReducer = (state, action) => {
  console.log('======type=====', action.type);
  if (action.type == RESET_REDUCER) {
    console.log('=======================whole redux reset================');
    state = undefined;
  }

  return appReducer(state, action);
};

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
