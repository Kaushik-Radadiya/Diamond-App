import axios from 'axios';

// Create axios client, pre-configured with baseURL
let APIKit = axios.create({
  baseURL: 'http://127.0.0.1/api/',
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
      console.log('=====response====', response);
      dispatch({type: successtype, payload: response});
    })
    .catch(function (error) {
      console.log('=====POST--ERROR=====', error.response);
      dispatch({type: failType, payload: error.response});
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
      console.log('=====GET--ERROR=====', error);
      dispatch({type: failType, payload: null});
    });
});

// export default APIKit;
