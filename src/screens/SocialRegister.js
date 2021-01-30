import React, {useState, useRef, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import Theme from '../utils/Theme';
import {useDispatch, useSelector} from 'react-redux';
import {
  API_RESPONSE_STATUS,
  APPTYPE,
  LOGINTYPE,
  TOKEN,
} from '../utils/Constant';
import CommonTextInput from '../component/CommonTextInput';
import CommonButton from '../component/CommonButton';
import {postApi, setClientToken} from '../utils/APIKit';
import {API_REGISTER} from '../utils/Url';
import {REGISTER_ERROR, REGISTER_SUCCESS, RESET} from '../redux/AuthReducer';
import Loader from '../component/Loader';
import Toast from '../component/Toast';
import {storeData} from '../utils/Utils';

export default function SocialRegister({navigation, route}) {
  const {apptype, userData} = route.params;

  const [mobileNumber, setMobileNumber] = useState('');
  const [companyName, setCompnayName] = useState('');
  const [loading, setLoader] = useState(false);
  const mobileNumberRef = useRef(null);
  const companyNameRef = useRef(null);
  const toast = useRef(null);
  const dispatch = useDispatch();
  const {registerResponse, registerError} = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerError) {
      setLoader(false);
      dispatch({type: RESET});
    }

    if (registerResponse) {
      console.log('======registerResponse', registerResponse);
      setLoader(false);
      if (registerResponse.status == API_RESPONSE_STATUS.STATUS_200) {
        setClientToken(registerResponse.data.token);
        storeData(TOKEN, registerResponse.data.token);
        storeData(
          LOGINTYPE.Type,
          userData.login_type == 'F' ? LOGINTYPE.Facebook : LOGINTYPE.Google,
        );
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
        console.log('====response.MESSAGE===', registerResponse.MESSAGE);
        toast.current.show(registerResponse.MESSAGE);
      }
    }
  }, [registerResponse, registerError]);

  const onNextPress = () => {
    let message = null;
    if (apptype == APPTYPE.JOBPROVIDER && companyName == '')
      message = 'Please Enter CompnayName';
    else if (mobileNumber == '') message = 'Please Enter Mobile Number';
    else {
      setLoader(true);
      const params = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        mobile: mobileNumber,
        type: apptype == APPTYPE.JOBPROVIDER ? 'JP' : 'JS',
        email: userData.email,
        login_type: userData.login_type,
        company_name: apptype == APPTYPE.JOBPROVIDER ? companyName : undefined,
      };

      dispatch(postApi(API_REGISTER, params, REGISTER_SUCCESS, REGISTER_ERROR));
    }

    if (message) toast.current.show(message);
  };

  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <Toast ref={toast} duration={5000} />
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <View style={styles.subContainer}>
          {apptype == APPTYPE.JOBPROVIDER ? (
            <CommonTextInput
              refs={companyNameRef}
              icon={'ic_company_name'}
              placeholder={'Company Name'}
              onChangeText={(text) => setCompnayName(text)}
              returnKeyType={'next'}
              onSubmitEditing={() => mobileNumberRef.current.focus()}
            />
          ) : null}
          <CommonTextInput
            refs={mobileNumberRef}
            icon={'ic_mobile'}
            placeholder={'Mobile Number'}
            onChangeText={(text) => setMobileNumber(text)}
            returnKeyType={'done'}
            keyboardType={'phone-pad'}
            onSubmitEditing={() => onNextPress()}
          />
          <CommonButton
            buttonStyle={[styles.buttonStyle]}
            text={'NEXT'}
            textStyle={[styles.buttonTextStyle]}
            buttonPress={onNextPress}
          />
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
  subContainer: {flex: 1, paddingHorizontal: 20, justifyContent: 'center'},
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
  },
});
