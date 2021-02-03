import React, {useState, useRef} from 'react';

import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';

import {useDispatch, useSelector} from 'react-redux';
import {clearToken, postApi} from '../../utils/APIKit';
import {API_LOGOUT} from '../../utils/Url';
import {LOGOUT_ERROR, LOGOUT_SUCCESS, RESET} from '../../redux/AuthReducer';
import {getData, storeData} from '../../utils/Utils';
import {API_RESPONSE_STATUS, LOGINTYPE, TOKEN} from '../../utils/Constant';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import Toast from '../../component/Toast';
import Loader from '../../component/Loader';
import {RESET_REDUCER} from '../../redux/Store';

export default function ProviderProfile({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(false);
  const toast = useRef(null);
  const {
    logoutResponse,
    logoutError,
    providerProfileData,
    providerProfileError,
  } = useSelector((state) => state.auth);

  const googleSignOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    if (logoutResponse) {
      setLoader(false);
      if (logoutResponse.status == API_RESPONSE_STATUS.STATUS_200) {
        console.log('======logoutResponse===', logoutResponse);
        getData(LOGINTYPE.Type).then((value) => {
          if (value == LOGINTYPE.Facebook) LoginManager.logOut();
          else if (value == LOGINTYPE.Google) googleSignOut();

          storeData(TOKEN, '');
          storeData(LOGINTYPE.Type, '');
          dispatch({type: RESET_REDUCER});
          clearToken();
          navigation.reset({
            index: 0,
            routes: [{name: 'SelectAppType'}],
          });
        });
      } else {
        toast.current.show(logoutResponse.message);
      }
    }

    if (logoutError) {
      setLoader(false);
      dispatch({type: RESET});
    }
  }, [logoutResponse, logoutError]);

  const renderBodyText = (title, value) => {
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
        <Text
          style={{
            fontFamily: Theme.fontFamily.PoppinsRegular,
            fontSize: Theme.fontSizes.mini - 1,
          }}>
          {value}
        </Text>
      </View>
    );
  };

  const renderImageAndText = (icon, title) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 5,
        }}>
        <Image style={{height: 18, width: 18}} source={{uri: icon}} />
        <Text
          style={{
            fontFamily: Theme.fontFamily.PoppinsRegular,
            fontSize: Theme.fontSizes.mini,
            marginLeft: 10,
          }}>
          {title}
        </Text>
      </View>
    );
  };

  const onLogout = () => {
    setLoader(true);
    dispatch(postApi(API_LOGOUT, {}, LOGOUT_SUCCESS, LOGOUT_ERROR));
  };

  const onEditProfile = () => {
    console.log('Edit Profile');
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
        <Text style={styles.headerTitle}>Hari Krishna Diamond PVT. LTD.</Text>
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
            {renderBodyText('Name', 'Savji Dholakia')}
            {renderBodyText('Mobile No', '0123456789')}
            {renderBodyText('Password', '* * * * * * *')}
            <View style={{flexDirection: 'row'}}>
              {renderBodyText('Current City', 'Surat')}
              {renderBodyText('State', 'Gujrat')}
            </View>
          </View>
          <Text style={styles.bodyTitle}>Company Details</Text>
          <View style={[styles.bodyCardContainer, {paddingBottom: 10}]}>
            {renderBodyText('Company Name', 'Hari Krishna Diamond PVT. LTD')}
            {renderBodyText(
              '',
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
            )}
            {renderImageAndText('ic_sm_web', 'www.harikrishnadiamond.com')}
            {renderImageAndText('ic_sm_mail', 'harikrishnadiamond@gmail.com')}
            {renderImageAndText('ic_sm_call', '0123456789')}
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
});
