import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonButton from '../component/CommonButton';
import CommonTextInput from '../component/CommonTextInput';
import {postApi, setClientToken} from '../utils/APIKit';
import {
  API_RESPONSE_STATUS,
  APPTYPE,
  FCM_TOKEN,
  LOGINTYPE,
  TOKEN,
} from '../utils/Constant';
import Theme from '../utils/Theme';
import {API_LOGIN, API_REGISTER} from '../utils/Url';
import {useDispatch, useSelector} from 'react-redux';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import Toast from '../component/Toast';
import Loader from '../component/Loader';
import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  REGISTER_ERROR,
  REGISTER_SUCCESS,
  RESET,
} from '../redux/AuthReducer';
import {getData, showAlert, storeData} from '../utils/Utils';

export default function Login({navigation, route}) {
  const {apptype} = route.params;
  const [email, setEmail] = useState('kaushikradadiya1995@gmail.com');
  const [password, setPassword] = useState('123456');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  const [loading, setLoader] = useState(false);
  const emailAddressInput = useRef(null);
  const passwordInput = useRef(null);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const {loginResponse, loginError} = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('=====logout=====');

    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    if (loginResponse) {
      setLoader(false);
      if (loginResponse.status == API_RESPONSE_STATUS.STATUS_200) {
        setClientToken(loginResponse.data.token);
        storeData(TOKEN, loginResponse.data.token);
        storeData(LOGINTYPE.Type, LOGINTYPE.Other);
        if (apptype == APPTYPE.JOBPROVIDER) {
          navigation.reset({
            index: 0,
            routes: [{name: 'Dashbord'}],
          });
        } else {
          navigation.reset({
            index: 0,
            routes: [{name: 'LookingFor'}],
          });
        }
      } else {
        toast.current.show(loginResponse.MESSAGE);
      }
    }

    if (loginError) {
      setLoader(false);
      dispatch({type: RESET});
    }
  }, [loginResponse, loginError]);

  const getInfoFromToken = (token) => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id,name,first_name,last_name,email',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      {token, parameters: PROFILE_REQUEST_PARAMS},
      (error, user) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          console.log('result:', user);
          const params = {
            firstName: user.first_name,
            lastName: user.last_name,
            type: apptype == APPTYPE.JOBPROVIDER ? 'JP' : 'JS',
            email: user.email,
            login_type: 'F',
          };

          navigateToSocialRegister(params);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onLoginButtonPress = async () => {
    // if (apptype == APPTYPE.JOBPROVIDER) {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: 'Dashbord'}],
    //   });
    // } else {
    //   navigation.reset({
    //     index: 0,
    //     routes: [{name: 'LookingFor'}],
    //   });
    // }

    if (email == '') toast.current.show('Please Enter Email');
    else if (password == '') toast.current.show('Please Enter Password');
    else {
      setLoader(true);
      const fcmtoken = await getData(FCM_TOKEN);
      const params = {
        email: email,
        password: password,
        fcmToken: fcmtoken,
      };

      dispatch(postApi(API_LOGIN, params, LOGIN_SUCCESS, LOGIN_ERROR));
    }
  };

  const navigateToSocialRegister = (data) => {
    navigation.navigate('SocialRegister', {apptype: apptype, userData: data});
  };

  const onFacebookButtonPress = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      (login) => {
        if (login.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) => {
            const accessToken = data.accessToken.toString();
            getInfoFromToken(accessToken);
          });
        }
      },
      (error) => {
        console.log('Login fail with error: ' + error);
      },
    );
  };
  const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('==========+>', userInfo);
      const data = userInfo.user;

      const params = {
        firstName: data.givenName,
        lastName: data.familyName,
        type: apptype == APPTYPE.JOBPROVIDER ? 'JP' : 'JS',
        email: data.email,
        login_type: 'G',
      };

      navigateToSocialRegister(params);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
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
          <Text style={styles.titleText}>Login</Text>
        </View>
        <View style={styles.bootomSubContainer}>
          <CommonTextInput
            refs={emailAddressInput}
            icon={'ic_mail'}
            placeholder={'Email Address'}
            onChangeText={(text) => setEmail(text)}
            returnKeyType={'next'}
            onSubmitEditing={() => passwordInput.current.focus()}
            keyboardType={'email-address'}
          />
          <CommonTextInput
            refs={passwordInput}
            icon={'ic_password'}
            placeholder={'Password'}
            returnKeyType={'done'}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={() => onLoginButtonPress()}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row-reverse', paddingVertical: 10}}
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassText}>Forgot password</Text>
          </TouchableOpacity>
          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: Theme.colors.theme,
                justifyContent: 'center',
              },
            ]}
            text={'LOGIN'}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: Theme.colors.whiteText,
                marginLeft: 0,
              },
            ]}
            buttonPress={onLoginButtonPress}
          />
          <Text style={styles.continueWithText}>Or Continue With</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CommonButton
              buttonStyle={[styles.buttonStyle, styles.socialButton]}
              icon={'ic_facebook'}
              iconStyle={styles.buttonIconStyle}
              text={'Facebook'}
              textStyle={[styles.buttonTextStyle]}
              buttonPress={onFacebookButtonPress}
            />
            <CommonButton
              buttonStyle={[styles.buttonStyle, styles.socialButton]}
              icon={'ic_google'}
              iconStyle={styles.buttonIconStyle}
              text={'Google'}
              textStyle={[styles.buttonTextStyle]}
              buttonPress={onGoogleButtonPress}
            />
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('Register', {apptype})}>
              <Text
                style={[
                  styles.registerText,
                  {
                    color: Theme.colors.theme,
                    marginHorizontal: 5,
                  },
                ]}>
                REGISTER
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
  },
  buttonIconStyle: {height: 25, width: 25},
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
    marginLeft: 10,
    includeFontPadding: false,
  },
  forgotPassText: {
    color: Theme.colors.theme,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
  continueWithText: {
    alignSelf: 'center',
    marginVertical: 15,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.mini,
  },
  socialButton: {
    backgroundColor: Theme.colors.categoryBg,
    flexDirection: 'row',
    width: '48%',
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
