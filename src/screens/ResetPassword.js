import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import CommonButton from '../component/CommonButton';
import CommonTextinput from '../component/CommonTextInput';
import Loader from '../component/Loader';
import {postApiWithoutDispatch} from '../utils/APIKit';
import { APPTYPE } from '../utils/Constant';
import {API_FORGOT_PASSWORD, API_RESET_PASSWORD} from '../utils/Url';
import { getData } from '../utils/Utils';

export default function ResetPassword({navigation, route}) {
  const {token} = route.params;

  console.log('==token===', token );
  const [password, setPassword] = useState('');
  const [confirmPassowrd, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef();

  const onSubmitButtonPresss = () => {
    let message = null;
    if (password == '') {
      message = 'Please enter new password';
    } else if (confirmPassowrd == '') {
      message = 'Please enter confim password';
    } else if (password != confirmPassowrd) {
      message = 'Password not match';
    }

    if (message) {
      toast.current.show(message);
    } else {
      setLoading(true);
      const params = {
        token: token,
        password: password
      };
      postApiWithoutDispatch(API_RESET_PASSWORD, params)
        .then((data) => {
          setLoading(false);
          console.log('==---data====', data);
          toast.current.show(data.message, 'SUCCESS');
        })
        .catch((error) => {
          console.log('===Forgotpassword---Error--', error);
        });
    }
  };

  const navigateToLogin = async() => {
    getData(APPTYPE.TYPE).then(type => {
      console.log("type====",type)
      navigation.navigate('Login', {apptype: type});
    })
  }
  return (
    <View style={styles.container}>
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>Reset Password</Text>
        </View>
        <View style={styles.bootomSubContainer}>
          <CommonTextinput
            icon={'ic_password'}
            placeholder={'Enter new password'}
            onChangeText={(text) => setPassword(text)}
            returnKeyType={'done'}
            // onSubmitEditing={() => onSendButtonPresss()}
          />
          <CommonTextinput
            icon={'ic_password'}
            placeholder={'Re-Enter password'}
            onChangeText={(text) => setConfirmPassword(text)}
            returnKeyType={'done'}
            onSubmitEditing={() => onSubmitButtonPresss()}
          />
          <CommonButton
            buttonStyle={[styles.buttonStyle]}
            text={'SUBMIT'}
            textStyle={[styles.buttonTextStyle]}
            buttonPress={onSubmitButtonPresss}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Back to</Text>
            <TouchableOpacity onPress={() => navigateToLogin()}>
              <Text
                style={[
                  styles.registerText,
                  {
                    color: Theme.colors.theme,
                    marginHorizontal: 5,
                  },
                ]}>
                LOGIN
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  titleText: {
    fontSize: Theme.fontSizes.large,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    color: Theme.colors.theme,
  },
  topSubContainer: {
    padding: 30,
  },
  bootomSubContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  buttonStyle: {
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: Theme.colors.theme,
    justifyContent: 'center',
  },
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.whiteText,
    marginLeft: 0,
    includeFontPadding: false,
  },
  registerContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
});
