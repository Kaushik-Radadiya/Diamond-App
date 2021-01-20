import {createStore, applyMiddleware, combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import JobProviderReducer from './JobProviderReducer';
import thunk from 'redux-thunk';

const store = createStore(
  combineReducers({auth: AuthReducer, jobProvider: JobProviderReducer}),
  applyMiddleware(thunk),
);

export default store;
