import {showAlert} from '../utils/Utils';

export default errorAlert = (e, isFatal) => {
  if (isFatal && e.message) {
    showAlert('Unexpected error occurred', `${e.message}`, 'OK', '', () => {});
  } else {
    console.log(Object.keys(e));
  }
};
