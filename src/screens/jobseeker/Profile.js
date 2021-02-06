import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import CommonHeader from '../../component/CommonHeader';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {LOGOUT_ERROR, LOGOUT_SUCCESS, RESET} from '../../redux/AuthReducer';
import {clearToken, postApi} from '../../utils/APIKit';
import {API_RESPONSE_STATUS, LOGINTYPE, TOKEN} from '../../utils/Constant';
import Theme from '../../utils/Theme';
import {API_GET_PROFILE_DETAIL, API_LOGOUT} from '../../utils/Url';
import {getData, storeData} from '../../utils/Utils';
import {LoginManager} from 'react-native-fbsdk';
import {GoogleSignin} from '@react-native-community/google-signin';
import {RESET_REDUCER} from '../../redux/Store';
import {
  GET_SEEKER_PROFILE_ERROR,
  GET_SEEKER_PROFILE_SUCCESS,
} from '../../redux/JobSeekerReducer';

export default function Profile({navigation}) {
  const dispatch = useDispatch();
  const [skills, setskills] = useState(['Syner', 'Colur Paurity', 'Fency']);
  const [loading, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperiance] = useState('');
  const [totalSavedJob, settotalSavedJob] = useState(0);
  const [totalAppliedJob, settotalAppliedJob] = useState(0);

  const toast = useRef(null);
  const {logoutResponse, logoutError} = useSelector((state) => state.auth);
  const {seekerJobsData, seekerProfileData, seekerProfileError} = useSelector(
    (state) => state.jobSeeker,
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
    setLoader(true);
    dispatch(
      postApi(
        API_GET_PROFILE_DETAIL,
        {},
        GET_SEEKER_PROFILE_SUCCESS,
        GET_SEEKER_PROFILE_ERROR,
      ),
    );
  }, []);

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

    if (seekerProfileData) {
      setLoader(false);
      if (seekerProfileData.status == API_RESPONSE_STATUS.STATUS_200) {
        console.log('======seekerProfileData===', seekerProfileData);
        const data = seekerProfileData.data.user;
        setName(data.name || 'Add Name');
        setMobileNo(data.mobile || 'Add Mobile Number');
        setPassword('password');
        setCity(data.city || 'Add City');
        setState(data.state || 'Add State');
        setCompanyName(data.company_name || 'Add Company Name');
        setEmail(data.company_email || 'Add Company Email');
        setExperiance(data.experience || 'Add Experience');
      } else {
        toast.current.show(logoutResponse.message);
      }
    }
    if (seekerProfileError) {
      setLoader(false);
      dispatch({type: RESET});
    }

    if (seekerJobsData) {
      console.log('====seekerJobsData====', seekerJobsData);
      if (
        seekerJobsData.status == API_RESPONSE_STATUS.STATUS_200 &&
        seekerJobsData.data &&
        seekerJobsData.data.jobs &&
        seekerJobsData.data.jobs.length
      ) {
        const appliedJobcount = seekerJobsData.data.jobs.filter(
          (item) => item.apply_user,
        ).length;
        const savedJobcount = seekerJobsData.data.jobs.filter(
          (item) => item.save_user,
        ).length;
        settotalAppliedJob(appliedJobcount);
        settotalSavedJob(savedJobcount);
      }
      setLoader(false);
    }
  }, [
    logoutResponse,
    logoutError,
    seekerProfileData,
    seekerProfileError,
    seekerJobsData,
  ]);

  const renderBodyText = (title, value, setData, keyboardType = 'default') => {
    return (
      <View style={{paddingBottom: 5, flex: 1}}>
        {title != '' ? <Text style={styles.subTitle}>{title}</Text> : null}
        <TextInput
          keyboardType={keyboardType}
          style={styles.textInputStyle}
          onChangeText={(text) => {
            setData(text);
          }}
          secureTextEntry={title == 'Password' ? true : false}
          value={value.toString()}
        />
      </View>
    );
  };

  const onLogout = () => {
    console.log('Logout');
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
      <CommonHeader
        title={'Profile'}
        isJobAvailable={true}
        navigation={navigation}
      />
      <View style={styles.headerContainer}>
        <View style={styles.profileBgContainer}>
          <Image style={{height: 35, width: 35}} source={{uri: 'ic_avatar'}} />
        </View>
        <Text style={styles.headerTitle}>John Doe</Text>
        <View style={styles.editProfileContiner}>
          <TouchableOpacity
            style={{flex: 1}}
            activeOpacity={0.8}
            onPress={() => onEditProfile()}>
            <Text style={styles.editProfileText}>EDIT PROFILE</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.saveAppliedContiner}>
          <TouchableOpacity style={styles.appliedButtonContainer}>
            <Text style={styles.appliedText}>{`(${totalSavedJob})`}</Text>
            <Text style={styles.appliedText}>Applied Job</Text>
          </TouchableOpacity>
          <View style={styles.sepratorLine} />
          <TouchableOpacity style={styles.appliedButtonContainer}>
            <Text style={styles.appliedText}>{`(${totalSavedJob})`}</Text>
            <Text style={styles.appliedText}>Saved Job</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flex: 1, padding: 15, paddingTop: 50}}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.bodyTitle}>Personal Details</Text>
          <View style={styles.bodyCardContainer}>
            {renderBodyText('Name', name, setName)}
            {renderBodyText('Email', email, setEmail)}
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
            {renderBodyText('Experience', experience, setExperiance)}
            <View>
              <Text
                style={[
                  styles.subTitle,
                  {
                    paddingVertical: 5,
                  },
                ]}>
                Skills
              </Text>
              <FlatList
                data={skills}
                extraData={skills}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <View style={styles.skillContainer}>
                    <Text style={styles.skillText}>{item}</Text>
                  </View>
                )}
              />
            </View>
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
    height: 150,
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
    marginVertical: 5,
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
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small - 1,
    color: Theme.colors.theme,
    textAlign: 'center',
  },
  skillContainer: {
    backgroundColor: Theme.colors.categoryBg,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  skillText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    color: Theme.colors.theme,
    includeFontPadding: false,
  },
  subTitle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.mini - 1,
  },
  saveAppliedContiner: {
    backgroundColor: Theme.colors.itemBg,
    borderRadius: 10,
    position: 'absolute',
    top: 122,
    height: 55,
    width: '97%',
    borderWidth: 1,
    borderColor: Theme.colors.border,
    flexDirection: 'row',
  },
  appliedButtonContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appliedText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 1,
    color: Theme.colors.theme,
  },
  sepratorLine: {
    width: 2,
    backgroundColor: Theme.colors.border,
    marginVertical: 10,
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
