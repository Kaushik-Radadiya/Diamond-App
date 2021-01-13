import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonButton from '../component/CommonButton';
import CommonTextInput from '../component/CommonTextInput';
import APIKit, {setClientToken} from '../utils/APIKit';
import {API_RESPONSE_STATUS, APPTYPE} from '../utils/Constant';
import Theme from '../utils/Theme';
import {API_LOGIN} from '../utils/Url';
import {useDispatch} from 'react-redux';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import Toast from '../component/Toast';
import Loader from '../component/Loader';

export default function Login({navigation, route}) {
  const {apptype} = route.params;
  const [email, setEmail] = useState('123@admin.com');
  const [password, setPassword] = useState('2');
  const [loading, setLoader] = useState(false);
  const emailAddressInput = useRef(null);
  const passwordInput = useRef(null);
  const toast = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('=====logout=====');
    // LoginManager.logOut();
    GoogleSignin.configure();
  }, []);

  // signOut = async () => {
  //   try {
  //     await GoogleSignin.revokeAccess();
  //     await GoogleSignin.signOut();
  //     setloggedIn(false);
  //     setuserInfo([]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  const onLoginButtonPress = () => {
    console.log('type====', apptype);

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

    // setLoader(true);
    // APIKit.post(API_LOGIN, {
    //   email: email,
    //   password: password,
    // })
    //   .then(function (response) {
    //     console.log('======', response.data);

    //     setLoader(false);
    //     if (response.status == API_RESPONSE_STATUS.STATUS_200) {
    //       dispatch({type: 'Login', payload: response});
    //       setClientToken(response.data.DATA.token);
    //       if (apptype == APPTYPE.JOBPROVIDER) {
    //         navigation.reset({
    //           index: 0,
    //           routes: [{name: 'Dashbord'}],
    //         });
    //       } else {
    //         navigation.reset({
    //           index: 0,
    //           routes: [{name: 'LookingFor'}],
    //         });
    //       }
    //     } else {
    //       console.log('====response.data.MESSAGE===', response.data.MESSAGE);
    //       console.log('=====toast', toast);
    //       toast.current.show(response.data.MESSAGE);
    //     }
    //   })
    //   .catch(function (error) {
    //     setLoader(false);
    //     toast.current.show('Network Error');
    //     console.log(error);
    //   });
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
      this.props.navigation.navigate('Home', userInfo.user);
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
          />
          <CommonTextInput
            refs={passwordInput}
            icon={'ic_password'}
            placeholder={'Password'}
            returnKeyType={'done'}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row-reverse', paddingVertical: 10}}
            onPress={() => {}}>
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
  welcomeImage: {
    marginVertical: 15,
  },
  topSubContainer: {
    padding: 35,
  },
  bootomSubContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  buttonStyle: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  buttonIconStyle: {height: 30, width: 30},
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
    marginLeft: 10,
  },
  textInputStyle: {
    marginHorizontal: 15,
    fontSize: Theme.fontSizes.small,
    fontFamily: Theme.fontFamily.PoppinsRegular,
  },
  forgotPassText: {
    color: Theme.colors.theme,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
  continueWithText: {
    alignSelf: 'center',
    marginVertical: 20,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
  socialButton: {
    backgroundColor: Theme.colors.categoryBg,
    flexDirection: 'row',
    width: '45%',
  },
  registerContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
});
