import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import CommonButton from '../component/CommonButton';
import CommonTextInput from '../component/CommonTextInput';
import {APPTYPE} from '../utils/Constant';
import Theme from '../utils/Theme';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
import {GoogleSignin, statusCodes} from '@react-native-community/google-signin';

export default function Register({navigation, route}) {
  const {apptype} = route.params;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompnayName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');

  const refFirstName = useRef(null);
  const refLastName = useRef(null);
  const refEmailAddress = useRef(null);
  const refCompanyName = useRef(null);
  const refMobileNumber = useRef(null);
  const refPassword = useRef(null);

  const onRegisterButtonPress = (item) => {};

  useEffect(() => {
    console.log('=====logout=====');
    // LoginManager.logOut();
    GoogleSignin.configure();
  }, []);

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
                width={'47%'}
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
                width={'47%'}
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
            />
            <CommonTextInput
              refs={refMobileNumber}
              icon={'ic_mobile'}
              placeholder={'Mobile Number'}
              onChangeText={(text) => setMobileNumber(text)}
              returnKeyType={'next'}
              onSubmitEditing={() => refPassword.current.focus()}
            />
            <CommonTextInput
              refs={refPassword}
              icon={'ic_password'}
              placeholder="Password"
              returnKeyType={'done'}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={() => {}}
            />

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
                paddingVertical: 30,
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: Theme.fontFamily.PoppinsMedium,
                  fontSize: Theme.fontSizes.small,
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
    padding: 35,
  },
  bootomSubContainer: {
    flex: 1,
    paddingHorizontal: 25,
  },
  buttonStyle: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 20,
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
    marginTop: 25,
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
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
});
