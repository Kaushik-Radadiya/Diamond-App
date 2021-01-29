import AsyncStorage from '@react-native-async-storage/async-storage';
import {EventRegister} from 'react-native-event-listeners';
import {LOGINTYPE, TOKEN} from './Constant';

export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (e) {
    // error reading value
  }
};

/**
 * To show native app alert.
 * @param {string} title- Alert title value.
 * @param {string} message - Message to show the user.
 * @param {string} positiveButtonTitle - Positive button label.
 * @param {function} negativeButtonTitle - Negative button label.
 * @param {callback} positiveButtonCallback - Positive button click handler callback function.
 * @param {callback} negativeButtonCallBack - Negative button click handler callback function.
 * @returns - None
 */
export const showAlert = (
  title = 'Title',
  message,
  positiveButtonTitle,
  negativeButtonTitle,
  positiveButtonCallback,
  negativeButtonCallBack,
) => {
  let data = {
    title: title,
    alertMessage: message,
    positiveButtonText: positiveButtonTitle,
    negativeButtonText: negativeButtonTitle || '',
    positiveButtonAction: positiveButtonCallback,
    negativeButtonAction: negativeButtonCallBack,
  };
  EventRegister.emit('AlertOpen', data);
};

export const removeEvent = (eventName) => {
  if (EventRegister._Listeners) {
    Object.keys(EventRegister._Listeners.refs).map((key) => {
      if (EventRegister._Listeners.refs[key].name == eventName) {
        EventRegister.removeEventListener(key);
      }
    });
  }
};
