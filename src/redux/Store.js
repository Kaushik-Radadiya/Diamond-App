import {createStore} from 'redux';
import LoginReducer from './LoginReducer';

const store = createStore(LoginReducer);

export default store;
