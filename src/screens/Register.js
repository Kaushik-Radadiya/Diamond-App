import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CommonButton from '../component/CommonButton';
import CommonTextInput from '../component/CommonTextInput';
import {API_RESPONSE_STATUS, APPTYPE} from '../utils/Constant';
import Theme from '../utils/Theme';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';
import {postApi} from '../utils/APIKit';
import {useDispatch, useSelector} from 'react-redux';
import {REGISTER_ERROR, REGISTER_SUCCESS, RESET} from '../redux/AuthReducer';
import {API_REGISTER} from '../utils/Url';
import Toast from '../component/Toast';
import Loader from '../component/Loader';

export default function Register({navigation, route}) {
  const {apptype} = route.params;
  // const [firstName, setFirstName] = useState('Kaushik');
  // const [lastName, setLastName] = useState('Radadiya');
  // const [companyName, setCompnayName] = useState('RK');
  // const [email, setEmail] = useState('kaushikradadiya112@gmail.com');
  // const [mobileNumber, setMobileNumber] = useState('1234567890');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompnayName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [loading, setLoader] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  const refEmailAddress = useRef(null);
  const refCompanyName = useRef(null);
  const refMobileNumber = useRef(null);
  const toast = useRef(null);
  // const refPassword = useRef(null);
  const {registerResponse, registerError} = useSelector((state) => state.auth);

  const onRegisterButtonPress = (item) => {
    setLoader(true);
    const params = {
      firstName: firstName,
      lastName: lastName,
      mobile: mobileNumber,
      type: apptype == APPTYPE.JOBPROVIDER ? 'JP' : 'JS',
      email: email,
      login_type: 'O',
      companyName: apptype == APPTYPE.JOBPROVIDER ? companyName : undefined,
    };

    register(params);
  };

  const register = (params) => {
    dispatch(postApi(API_REGISTER, params, REGISTER_SUCCESS, REGISTER_ERROR));
  };

  useEffect(() => {
    console.log('=====logout=====');
    // LoginManager.logOut();
    GoogleSignin.configure();
  }, []);

  useEffect(() => {
    if (registerResponse) {
      console.log('======registerResponse', registerResponse);
      setLoader(false);
      if (registerResponse.status == API_RESPONSE_STATUS.STATUS_200) {
        toast.current.show(registerResponse.message, 'SUCCESS');
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
      } else {
        console.log('====response.MESSAGE===', registerResponse.MESSAGE);
        toast.current.show(registerResponse.MESSAGE);
      }
    }

    if (registerError) {
      setLoader(false);
      dispatch({type: RESET});
    }
  }, [registerResponse, registerError]);

  const navigateToSocialRegister = (data) => {
    navigation.navigate('SocialRegister', {apptype: apptype, userData: data});
  };

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
          <Text style={styles.titleText}>Register</Text>
        </View>
        <ScrollView>
          <View style={styles.bootomSubContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <CommonTextInput
                refs={refFirstName}
                icon={'ic_user'}
                placeholder={'First Name'}
                onChangeText={(text) => setFirstName(text)}
                returnKeyType={'next'}
                onSubmitEditing={() => refLastName.current.focus()}
                width={'48%'}
              />
              <CommonTextInput
                refs={refLastName}
                icon={'ic_user'}
                placeholder={'Last Name'}
                onChangeText={(text) => setLastName(text)}
                returnKeyType={'next'}
                onSubmitEditing={() =>
                  apptype == APPTYPE.JOBPROVIDER
                    ? refCompanyName.current.focus()
                    : refEmailAddress.current.focus()
                }
                width={'48%'}
              />
            </View>
            {apptype == APPTYPE.JOBPROVIDER ? (
              <CommonTextInput
                refs={refCompanyName}
                icon={'ic_company_name'}
                placeholder={'Company Name'}
                onChangeText={(text) => setCompnayName(text)}
                returnKeyType={'next'}
                onSubmitEditing={() => refEmailAddress.current.focus()}
              />
            ) : null}
            <CommonTextInput
              refs={refEmailAddress}
              icon={'ic_mail'}
              placeholder={'Email Address'}
              onChangeText={(text) => setEmail(text)}
              returnKeyType={'next'}
              onSubmitEditing={() => refMobileNumber.current.focus()}
              keyboardType={'email-address'}
            />
            <CommonTextInput
              refs={refMobileNumber}
              icon={'ic_mobile'}
              placeholder={'Mobile Number'}
              onChangeText={(text) => setMobileNumber(text)}
              returnKeyType={'done'}
              keyboardType={'phone-pad'}
              onSubmitEditing={() => onRegisterButtonPress()}
            />
            {/* <CommonTextInput
              refs={refPassword}
              icon={'ic_password'}
              placeholder="Password"
              returnKeyType={'done'}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={() => {}}
            /> */}

            <CommonButton
              buttonStyle={[
                styles.buttonStyle,
                {
                  backgroundColor: Theme.colors.theme,
                  justifyContent: 'center',
                },
              ]}
              text={'REGISTER'}
              textStyle={[
                styles.buttonTextStyle,
                {
                  color: Theme.colors.whiteText,
                  marginLeft: 0,
                },
              ]}
              buttonPress={onRegisterButtonPress}
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
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Theme.fontFamily.PoppinsMedium,
                  fontSize: Theme.fontSizes.mini,
                }}>
                By Continuing Your Confirm That You Agree With Our Terms And
                Condition
              </Text>
            </View>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Already have an account?</Text>
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
        </ScrollView>
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
    padding: 30,
  },
  bootomSubContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  buttonStyle: {
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  buttonIconStyle: {height: 25, width: 25},
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
    marginLeft: 10,
  },
  continueWithText: {
    alignSelf: 'center',
    marginTop: 20,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small - 1,
  },
  socialButton: {
    backgroundColor: Theme.colors.categoryBg,
    flexDirection: 'row',
    width: '45%',
  },
  registerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small - 1,
  },
});
