import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonDropDown from '../../component/CommonDropDown';

import CommonHeader from '../../component/CommonHeader';
import CommonTextinput from '../../component/CommonTextInput';
import DropDownModal from '../../component/DropDownModal';
import {useDispatch, useSelector} from 'react-redux';
import {postApi} from '../../utils/APIKit';
import {API_GET_JOB_CATEGORY, API_POST_JOB} from '../../utils/Url';
import {
  GET_JOB_CATEGORY_ERROR,
  GET_JOB_CATEGORY_SUCCESS,
  POST_JOB_ERROR,
  POST_JOB_RESET,
  POST_JOB_SUCCESS,
} from '../../redux/JobProviderReducer';
import {RESET} from '../../redux/AuthReducer';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Theme from '../../utils/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function JobPost({navigation}) {
  const width = useWindowDimensions().width;
  const dispatch = useDispatch();
  const {
    postJobData,
    postJobError,
    jobcategoryData,
    jobcategoryError,
  } = useSelector((state) => state.jobProvider);
  const [type, setType] = useState('');
  const [dropDownVisible, showHideDropDown] = useState(false);
  const [selectedCategory, setCategory] = useState({
    id: 0,
    name: 'Select Category',
  });
  const [selectedEmployemnetType, setEmployementType] = useState({
    id: 0,
    name: 'Select employement type',
  });
  const [jobTitle, setjobTitle] = useState('Job Title (Designation)');
  const [experience, setExperience] = useState('Work experience you need');
  const [sallery, setSallery] = useState('10000 - 100000');
  const [description, setDescription] = useState(
    'Describe your job post, What you need',
  );
  const [role, setRole] = useState('Employee role');
  const [skill, setSkill] = useState('Skills you need for work');
  const [qualificaiton, setQualificaiton] = useState(
    'Qualification (Optional)',
  );
  const [vacancy, setVacancy] = useState('How many employees you recruit');
  const [location, setLocation] = useState('Job location (City)');
  const [loading, setLoader] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [saveForlater, setSaveForlater] = useState(false);
  const toast = React.useRef(null);

  React.useEffect(() => {
    setLoader(true);
    dispatch(
      postApi(
        API_GET_JOB_CATEGORY,
        {},
        GET_JOB_CATEGORY_SUCCESS,
        GET_JOB_CATEGORY_ERROR,
      ),
    );
  }, []);
  React.useEffect(() => {
    if (postJobData) {
      console.log('====postJobData====', postJobData);
      if (postJobData.status == API_RESPONSE_STATUS.STATUS_200) {
        toast.current.show(postJobData.message, 'SUCCESS');
        dispatch({type: POST_JOB_RESET});
      }
      setLoader(false);
    }

    if (postJobError) {
      console.log('====postJobError====', postJobError);
      setLoader(false);
      dispatch({type: POST_JOB_RESET});
    }

    if (jobcategoryData) {
      if (
        jobcategoryData.status == API_RESPONSE_STATUS.STATUS_200 &&
        jobcategoryData.data &&
        jobcategoryData.data.category.length
      ) {
        setCategoryData(jobcategoryData.data.category);
      } else {
        toast.current.show(jobcategoryData.message);
      }
      setLoader(false);
    }
    if (jobcategoryError) {
      setLoader(false);
      dispatch({type: RESET});
    }
  }, [postJobData, postJobError, jobcategoryData, jobcategoryError]);

  const onSave = (item) => {
    if (type == 'Category') {
      setCategory(item);
    } else if (type == 'Employement Type') {
      setEmployementType(item);
    }

    showHideDropDown(false);
  };

  const onInfoPress = () => {};
  const showDropDown = (type) => {
    setType(type);
    showHideDropDown(true);
  };

  const postJob = () => {
    setLoader(true);
    const params = {
      category_id: 1,
      title: 'test',
      description: 'test',
      experience: '3 yr',
      salary: '20,0000',
      employment_type: 'FT',
      employee_role: 'manager',
      employee_skills: 'skill',
      qualification: 'B.E',
      vacancy: 5,
      location: 'test',
      image: 'test',
    };
    dispatch(postApi(API_POST_JOB, params, POST_JOB_SUCCESS, POST_JOB_ERROR));
  };

  const renderTextInput = (
    title,
    placeholder,
    setdata,
    keyboardType = 'default',
  ) => {
    return (
      <View style={{paddingVertical: 5}}>
        <Text style={{fontFamily: Theme.fontFamily.PoppinsRegular}}>
          {title}
        </Text>
        <CommonTextinput
          icon={'ic_category'}
          placeholder={placeholder}
          onChangeText={(text) => setdata(text)}
          returnKeyType={'next'}
          keyboardType={keyboardType}
        />
      </View>
    );
  };

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Loader loading={loading} />
      <Toast ref={toast} duration={5000} />
      <CommonHeader
        isBack={true}
        title={'Post Job'}
        headerRightButtonPress={onInfoPress}
        headerRightIcon={'ic_info'}
        navigation={navigation}
      />
      <DropDownModal
        type={type}
        visible={dropDownVisible}
        onSave={onSave}
        onCancel={() => showHideDropDown(false)}
        data={categoryData}
      />
      <ScrollView>
        <View style={{padding: 15}}>
          <CommonDropDown
            title={'Category'}
            buttonText={selectedCategory.name}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {renderTextInput('Job Title (Designation)', jobTitle, setjobTitle)}
          {renderTextInput('Experience', experience, setExperience)}
          {renderTextInput('Sallery', sallery, setSallery)}
          {renderTextInput('Job Description', description, setDescription)}
          <CommonDropDown
            title={'Employement Type'}
            buttonText={selectedEmployemnetType.name}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {renderTextInput('Employee Role', role, setRole)}
          {renderTextInput('Employee Skills', skill, setSkill)}
          {renderTextInput('Qualification', qualificaiton, setQualificaiton)}
          {renderTextInput('Vacancy', vacancy, setVacancy)}
          {renderTextInput('Location', location, setLocation)}

          <View style={styles.chooseImageContainer}>
            <View style={styles.imageContainer}>
              {/* <Image style={{}} /> */}
            </View>
            <TouchableOpacity
              style={[styles.chooseImageButton, {width: width - 120}]}>
              <Text style={styles.chooseImageText}>Choose Image</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.saveForLaterButton}
            onPress={() => setSaveForlater(!saveForlater)}>
            <Image
              style={{height: 20, width: 20}}
              source={{
                uri: saveForlater ? 'ic_radiofill' : 'ic_radio',
              }}
            />
            <Text style={styles.saveForLaterText}>Save for later</Text>
          </TouchableOpacity>
          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: Theme.colors.theme,
                justifyContent: 'center',
              },
            ]}
            text={'POST JOB'}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: Theme.colors.whiteText,
              },
            ]}
            buttonPress={() => postJob()}
          />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    marginVertical: 5,
  },
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
    includeFontPadding: false,
    alignItems: 'center',
  },
  chooseImageContainer: {
    height: 65,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: Theme.colors.categoryBg,

    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Theme.colors.theme,
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Theme.colors.whiteText,
    alignContent: 'center',
  },
  chooseImageButton: {
    marginLeft: 10,
    height: 50,
    justifyContent: 'center',
  },
  chooseImageText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
    textAlign: 'center',
  },
  saveForLaterButton: {
    marginVertical: 5,
    height: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveForLaterText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    marginLeft: 5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
});
