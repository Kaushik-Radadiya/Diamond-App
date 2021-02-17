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
import {API_FORGOT_PASSWORD} from '../utils/Url';

export default function ForgotPassword({navigation}) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useRef();

  const onSendButtonPresss = () => {
    if (password == '') {
      toast.current.show('Please enter email');
    } else {
      setLoading(true);
      const params = {
        email: 'kaushikradadiya1995@gmail.com',
      };

      postApiWithoutDispatch(API_FORGOT_PASSWORD, params)
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
  return (
    <View style={styles.container}>
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>Forgot Password</Text>
        </View>
        <View style={styles.bootomSubContainer}>
          <CommonTextinput
            icon={'ic_mail'}
            placeholder={'Email Address'}
            onChangeText={(text) => setEmail(text)}
            returnKeyType={'done'}
            onSubmitEditing={() => onSendButtonPresss()}
            keyboardType={'email-address'}
          />
          <CommonButton
            buttonStyle={[styles.buttonStyle]}
            text={'SEND'}
            textStyle={[styles.buttonTextStyle]}
            buttonPress={onSendButtonPresss}
          />
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Back to</Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
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
