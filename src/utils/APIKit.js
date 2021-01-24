import axios from 'axios';
import {BASE_URL} from './Constant';
import errorAlert from './ExceptionHandler';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {'Content-Type': 'application/json', Accept: "'application/json'"},
});

// Set JSON Web Token in Client to be included in all calls
export const setClientToken = (token) => {
  APIKit.interceptors.request.use(function (config) {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });
};

export const postApi = (url, params, successtype, failType = 'default') => (
  dispatch,
) => {
  console.log('=====POST=====', params, url);
  APIKit.post(url, params)
    .then(function (response) {
      console.log('=====response====', response.data);
      dispatch({type: successtype, payload: response});
    })
    .catch(function (error) {
      console.log('=====POST--ERROR=====', error.response.data);
      dispatch({type: failType, payload: error.response});
      errorAlert(error.response.data, true);
    });
};

export const getApi = (dispatch = (
  url,
  params = {},
  successtype,
  failType = 'default',
) => {
  console.log('=====GET=====', url);
  APIKit.get(url, params)
    .then(function (response) {
      dispatch({type: successtype, payload: response});
    })
    .catch(function (error) {
      console.log('=====GET--ERROR=====', error.response);
      dispatch({type: failType, payload: error.response});
      errorAlert(error.response, true);
    });
});

// export default APIKit;
