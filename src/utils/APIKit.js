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
    // config.headers.Authorization = `Bearer ${token}`;
    config.headers.Authorization = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNmIyZWM2OGM2Y2E2ZDYzY2Q3NjBhYmQ1OGRhNWM4M2UwNTE1ZDZiMjBjNGEyMGZhNDUxMWI4NDc5NTAxNDdhMTM3NTk5ZjA1NmQ1Mzc2MjEiLCJpYXQiOiIxNjA5MTcyNTY0LjQ1MTM4MSIsIm5iZiI6IjE2MDkxNzI1NjQuNDUxMzg5IiwiZXhwIjoiMTY0MDcwODU2NC4zODY1MDQiLCJzdWIiOiI3Iiwic2NvcGVzIjpbXX0.ktJG4SnTZgikUV3k9ZEYV6moC1V0EfkfCya3HSaPorBBCduKEuvnUlBz1u3iwSSZNPymCWu-D1XQdYEVmOnsE9NwMTARDnkB3mtcjSImlxPoA2hhQDcczrvn2Dxppzuv9D6h__0v_x2yJ_KphUEz2fzZrhu17t_gg3oYy79ugSIGuCUAXw-PZpMurUOH0dF_uIUoDWZp69evuvKxlzscQs-h-ZYE1IvwcdM_v30CkrMUBJeAd8iiZ0U3AYggUmXYnd-d55dCuZKp1Jk1TMpdEREyWWnb-O4wVPHcldbFJ5-IGHkUx0Jk54Ci1YDBdu0BfIf0QUX3XXNmLT2RxB0A4kOEeTl7-X-w0DXvmNJS3hcegJhHURIskK9bJiktD11F7XZRITxF0LSVhwOQm9ICF601cu4EWBxqWnTZoHeNWexhKfh5bult0z5yR2BNCqdVR-QmVLuUG7kwlw4DKcX6q080cQ0cvBMkFtEvsUajW7ZzDb5cw2w1YMbLC-lMK6dXIBw_SLgNtAr2Sq_063Nkj3Wmfj2PTE9KB7hKa-GxDE4zSox2klOqnznpKbWAv-QIM9T3aaswJnbOoKaUv56MgFBaD7NZYfqrgRaVopJIBrAoeZfgXBzkOdQ4-pfiCD6E8At3hBTNgB_NrtO9WD4VJItuMX_K_4rgbWrq3p1aHsQ`;
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
