import {showAlert} from '../utils/Utils';

export default errorAlert = (e, isFatal) => {
  console.log('======error====', e);
  if (isFatal && e.message) {
    showAlert(
      'Unexpected error occurred',
      `Error: ${isFatal ? 'Fatal:' : ''} ${e.message}`,
      'OK',
      '',
      () => {},
    );
  } else {
    console.log(Object.keys(e));
  }
};
