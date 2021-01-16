import {createStore, applyMiddleware} from 'redux';
import LoginReducer from './LoginReducer';
import thunk from 'redux-thunk';

const store = createStore(LoginReducer, applyMiddleware(thunk));

export default store;
