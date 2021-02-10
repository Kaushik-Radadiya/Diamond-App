import React, {useState, useRef} from 'react';

import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';

import {useDispatch, useSelector} from 'react-redux';
import {clearToken, postApi} from '../../utils/APIKit';
import {
  API_EDIT_PROFILE_DETAIL,
  API_GET_PROFILE_DETAIL,
  API_LOGOUT,
} from '../../utils/Url';
import {LOGOUT_ERROR, LOGOUT_SUCCESS, RESET} from '../../redux/AuthReducer';
import {getData, showAlert, storeData} from '../../utils/Utils';
import {API_RESPONSE_STATUS, LOGINTYPE, TOKEN} from '../../utils/Constant';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import Toast from '../../component/Toast';
import Loader from '../../component/Loader';
import {RESET_REDUCER} from '../../redux/Store';
import {
  GET_PROVIDER_PROFILE_ERROR,
  GET_PROVIDER_PROFILE_SUCCESS,
} from '../../redux/JobProviderReducer';

let loginType = 'other';
export default function ProviderProfile({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [email, setEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');

  const toast = useRef(null);
  const {logoutResponse, logoutError} = useSelector((state) => state.auth);

  const {providerProfileData, providerProfileError} = useSelector(
    (state) => state.jobProvider,
  );

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getData(LOGINTYPE.Type).then((value) => {
      loginType = value;
    });
    setLoader(true);
    dispatch(
      postApi(
        API_GET_PROFILE_DETAIL,
        {},
        GET_PROVIDER_PROFILE_SUCCESS,
        GET_PROVIDER_PROFILE_ERROR,
      ),
    );
  }, []);
  React.useEffect(() => {
    if (logoutResponse) {
      setLoader(false);
      if (logoutResponse.status == API_RESPONSE_STATUS.STATUS_200) {
        console.log('======logoutResponse===', logoutResponse);

        if (loginType == LOGINTYPE.Facebook) LoginManager.logOut();
        else if (loginType == LOGINTYPE.Google) googleSignOut();

        storeData(TOKEN, '');
        storeData(LOGINTYPE.Type, '');
        dispatch({type: RESET_REDUCER});
        clearToken();
        navigation.reset({
          index: 0,
          routes: [{name: 'SelectAppType'}],
        });
      } else {
        toast.current.show(logoutResponse.message);
      }
    }

    if (logoutError) {
      setLoader(false);
      dispatch({type: RESET});
    }

    if (providerProfileData) {
      setLoader(false);
      if (providerProfileData.status == API_RESPONSE_STATUS.STATUS_200) {
        console.log('======providerProfileData===', providerProfileData);
        const data = providerProfileData.data.user;
        setName(data.name || 'Add Name');
        setMobileNo(data.mobile || 'Add Mobile Number');
        setPassword('password');
        setCity(data.city || 'Add City');
        setState(data.state || 'Add State');
        setCompanyName(data.company_name || 'Add Company Name');
        setDescription(data.company_description || 'Add Company Description');
        setWebsite(data.company_website || 'Add Company WebSite');
        setEmail(data.company_email || 'Add Company Email');
        setCompanyPhone(data.company_phone || 'Add Company Number');
      } else {
        toast.current.show(logoutResponse.message);
      }
    }
    if (providerProfileError) {
      setLoader(false);
      dispatch({type: RESET});
    }
  }, [logoutResponse, logoutError, providerProfileData, providerProfileError]);

  const renderBodyText = (title, value, setData, keyboardType = 'default') => {
    return (
      <View style={{paddingBottom: 5, flex: 1}}>
        {title != '' ? (
          <Text
            style={{
              fontFamily: Theme.fontFamily.PoppinsMedium,
              fontSize: Theme.fontSizes.mini - 1,
            }}>
            {title}
          </Text>
        ) : null}
        <TextInput
          keyboardType={keyboardType}
          style={styles.textInputStyle}
          onChangeText={(text) => {
            setData(text);
          }}
          secureTextEntry={title == 'Password' ? true : false}
          editable={title == 'Password' ? false : true}
          value={value.toString()}
        />
      </View>
    );
  };

  const renderImageAndText = (
    icon,
    value,
    setData,
    keyboardType = 'default',
  ) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
          alignItems: 'center',
        }}>
        <Image style={{height: 18, width: 18}} source={{uri: icon}} />
        <TextInput
          keyboardType={keyboardType}
          style={[styles.textInputStyle, {marginLeft: 10}]}
          onChangeText={(text) => {
            setData(text);
          }}
          value={value.toString()}
        />
      </View>
    );
  };

  const onLogout = () => {
    showAlert(
      'Logout',
      'Are you sure, Want to logout',
      'Yes',
      'No',
      () => {
        setLoader(true);
        dispatch(postApi(API_LOGOUT, {}, LOGOUT_SUCCESS, LOGOUT_ERROR));
      },
      () => {},
    );
  };

  

  const onEditProfile = () => {
    console.log('Edit Profile');

    let message = null;
    if (name == '') {
      message = 'Please enter name';
    } else if (mobileNo == '') {
      message = 'Please enter mobile number';
    } else if (city == '' || city == 'Add City') {
      message = 'Please enter City';
    } else if (state == '' || state == 'Add State') {
      message = 'Please enter State';
    } else if (companyName == '' || companyName == 'Add Company Name') {
      message = 'Please enter company name';
    } else if (description == '' || description == 'Add Company Description') {
      message = 'Please enter company description';
    } else if (website == '' || website == 'Add Company WebSite') {
      message = 'Please enter website';
    } else if (email == '' || email == 'Add Company Email') {
      message = 'Please enter company email';
    } else if (companyPhone == '' || companyPhone == 'Add Company Number') {
      message = 'Please enter company number';
    }

    if (message) {
      toast.current.show(message);
    } else {
      const nameArray = name.split(' ');
      const parmas = {
        firstName: nameArray[0] || '',
        lastName: nameArray[1] || '',
        mobile: mobileNo,
        type: 'JP',
        login_type:
          loginType == LOGINTYPE.Facebook
            ? 'F'
            : loginType == LOGINTYPE.Google
            ? 'G'
            : 'O',
        company_name: companyName,
        company_description: description,
        company_phone: companyPhone,
        company_email: email,
        company_website: website,
        city: city,
        state: state,
      };

      setLoader(true);
      dispatch(
        postApi(
          API_EDIT_PROFILE_DETAIL,
          parmas,
          GET_PROVIDER_PROFILE_SUCCESS,
          GET_PROVIDER_PROFILE_ERROR,
        ),
      );
    }
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      <CommonHeader title={'Profile'} isJobProvider navigation={navigation} />
      <View style={styles.headerContainer}>
        <View style={styles.profileBgContainer}>
          <Image style={{height: 35, width: 35}} source={{uri: 'ic_avatar'}} />
        </View>
        <TextInput style={styles.headerTitle}>{companyName}</TextInput>
        <View style={styles.editProfileContiner}>
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={0.8}
            onPress={() => onEditProfile()}>
            <Text style={styles.editProfileText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, padding: 15}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.bodyTitle}>Personal Details</Text>
          <View style={styles.bodyCardContainer}>
            {renderBodyText('Name', name, setName)}
            {renderBodyText('Mobile No', mobileNo, setMobileNo, 'phone-pad')}
            {renderBodyText('Password', password, setPassword)}
            <View style={{flexDirection: 'row'}}>
              {renderBodyText('Current City', city, setCity)}
              {renderBodyText('State', state, setState)}
            </View>
          </View>
          <Text style={styles.bodyTitle}>Company Details</Text>
          <View style={[styles.bodyCardContainer, {paddingBottom: 10}]}>
            {renderBodyText('Company Name', companyName, setCompanyName)}
            {renderBodyText('', description, setDescription)}
            {renderImageAndText('ic_sm_web', website, setWebsite)}
            {renderImageAndText('ic_sm_mail', email, setEmail)}
            {renderImageAndText(
              'ic_sm_call',
              companyPhone,
              setCompanyPhone,
              'phone-pad',
            )}
          </View>
          <TouchableOpacity
            style={styles.logoutContainer}
            activeOpacity={0.8}
            onPress={() => onLogout()}>
            <Text style={styles.logoutText}>LOGOUT</Text>
            <Image
              style={{height: 22, width: 22}}
              source={{uri: 'ic_logout'}}></Image>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Theme.colors.theme,
    paddingHorizontal: 10,
    height: 140,
    width: '100%',
    alignItems: 'center',
  },
  profileBgContainer: {
    height: 80,
    width: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: Theme.colors.whiteText,
    backgroundColor: Theme.colors.profileBg,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  headerTitle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.whiteText,
  },
  editProfileContiner: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#6861EF',
    borderRadius: 5,
    position: 'absolute',
    right: 20,
    top: 10,
    justifyContent: 'center',
  },
  editProfileText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    color: Theme.colors.whiteText,
    includeFontPadding: false,
    textAlign: 'center',
  },
  bodyTitle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small - 1,
  },
  bodyCardContainer: {
    marginVertical: 15,
    backgroundColor: Theme.colors.itemBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  logoutContainer: {
    marginVertical: 10,
    backgroundColor: Theme.colors.itemBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    paddingHorizontal: 15,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoutText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small - 1,
    color: Theme.colors.theme,
    textAlign: 'center',
  },
  textInputStyle: {
    height: 20,
    flex: 1,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini - 1,
    includeFontPadding: false,
    padding: 0,
  },
});
