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
import {
  API_GET_JOB_CATEGORY,
  API_IMAGE_UPLOAD,
  API_POST_JOB,
} from '../../utils/Url';
import {
  GET_JOB_CATEGORY_ERROR,
  GET_JOB_CATEGORY_SUCCESS,
  IMAGE_UPLOAD_ERROR,
  IMAGE_UPLOAD_SUCCESS,
  POST_JOB_ERROR,
  POST_JOB_RESET,
  POST_JOB_SUCCESS,
  RESET_IMAGE_UPLOAD,
} from '../../redux/JobProviderReducer';
import {RESET} from '../../redux/AuthReducer';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {API_RESPONSE_STATUS, SAVED_POST_DATA} from '../../utils/Constant';
import Theme from '../../utils/Theme';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {getData, storeData} from '../../utils/Utils';

export default function JobPost({navigation}) {
  const width = useWindowDimensions().width;
  const dispatch = useDispatch();
  const {
    postJobData,
    postJobError,
    jobcategoryData,
    jobcategoryError,
    imageUploadData,
    imageUploadError,
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
  const [jobTitle, setjobTitle] = useState('');
  const [experience, setExperience] = useState('');
  const [sallery, setSallery] = useState('');
  const [description, setDescription] = useState('');
  const [role, setRole] = useState('');
  const [skill, setSkill] = useState('');
  const [qualificaiton, setQualificaiton] = useState('');
  const [vacancy, setVacancy] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoader] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [saveForlater, setSaveForlater] = useState(false);
  const [selectedImageUri, setSlectedImage] = useState(null);
  const [selectedImageName, setSlectedImageName] = useState(null);
  const toast = React.useRef(null);

  const employmentData = [
    {
      id: 'PT',
      name: 'Part Time',
    },
    {
      id: 'FT',
      name: 'Full Time',
    },
  ];

  React.useEffect(() => {
    if (!jobcategoryData) {
      setLoader(true);
      dispatch(
        postApi(
          API_GET_JOB_CATEGORY,
          {},
          GET_JOB_CATEGORY_SUCCESS,
          GET_JOB_CATEGORY_ERROR,
        ),
      );
    }

    setSavedData();
  }, []);

  React.useEffect(() => {
    if (postJobData) {
      console.log('====postJobData====', postJobData);
      if (postJobData.status == API_RESPONSE_STATUS.STATUS_200) {
        toast.current.show(postJobData.message, 'SUCCESS');
        dispatch({type: POST_JOB_RESET});
        setLoader(false);
      }
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

    if (imageUploadData && imageUploadData.data) {
      console.log('============imageUpload======', imageUploadData);
      setSlectedImageName(
        imageUploadData.data.url ? imageUploadData.data.url : '',
      );
      setLoader(false);
      dispatch({type: RESET_IMAGE_UPLOAD});
    }

    if (imageUploadError) {
      setLoader(false);
      dispatch({type: RESET_IMAGE_UPLOAD});
    }
  }, [
    postJobData,
    postJobError,
    jobcategoryData,
    jobcategoryError,
    imageUploadData,
    imageUploadError,
  ]);

  const setSavedData = () => {
    getData(SAVED_POST_DATA).then((data) => {
      if (data) {
        const savedData = JSON.parse(data);
        setCategory(savedData.category);
        setjobTitle(savedData.title);
        setDescription(savedData.description);
        setExperience(savedData.experience);
        setSallery(savedData.salary);
        setEmployementType(savedData.employment_type);
        setRole(savedData.employee_role);
        setSkill(savedData.employee_skills);
        setQualificaiton(savedData.qualification);
        setVacancy(savedData.vacancy);
        setLocation(savedData.location);
        setSlectedImage(savedData.image);
        setSlectedImageName(savedData.imageName);
      }
    });
  };
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
    let errorMsg = '';

    if (selectedCategory.id == 0) errorMsg = 'Please select category';
    else if (jobTitle == '') errorMsg = 'Please enter job title';
    else if (experience == '') errorMsg = 'Please enter work experience';
    else if (sallery == '') errorMsg = 'Please enter sallery';
    else if (description == '') errorMsg = 'Please enter job description';
    else if (selectedEmployemnetType.id == 0)
      errorMsg = 'Please select employment type';
    else if (role == '') errorMsg = 'Please enter employee role';
    else if (skill == '') errorMsg = 'Please enter skills';
    else if (vacancy == '') errorMsg = 'Please enter number of vacancy';
    else if (location == '') errorMsg = 'Please enter job location';
    else if (!selectedImageUri) errorMsg = 'Please choose image';

    if (errorMsg == '') {
      setLoader(true);

      const params = {
        category_id: selectedCategory.id,
        title: jobTitle,
        description: description,
        experience: experience,
        salary: sallery,
        employment_type: selectedEmployemnetType.id,
        employee_role: role,
        employee_skills: skill,
        qualification:
          qualificaiton == 'Qualification (Optional)' ? '' : qualificaiton,
        vacancy: vacancy,
        location: location,
        image: selectedImageName,
      };

      if (saveForlater) {
        const data = {
          category: selectedCategory,
          title: jobTitle,
          description: description,
          experience: experience,
          salary: sallery,
          employment_type: selectedEmployemnetType,
          employee_role: role,
          employee_skills: skill,
          qualification:
            qualificaiton == 'Qualification (Optional)' ? '' : qualificaiton,
          vacancy: vacancy,
          location: location,
          image: selectedImageUri,
          imageName: selectedImageName,
        };
        storeData(SAVED_POST_DATA, JSON.stringify(data));
      }
      dispatch(postApi(API_POST_JOB, params, POST_JOB_SUCCESS, POST_JOB_ERROR));
    } else {
      toast.current.show(errorMsg);
    }
  };

  const chooseImage = () => {
    launchImageLibrary({mediaType: 'photo'}, (data) => {
      if (data.didCancel) {
      } else if (data.errorCode) {
      } else {
        console.log('=====data======', data);
        setSlectedImage(data.uri);

        setLoader(true);
        let imageFormData = new FormData();

        const imageData = {
          uri: data.uri,
          type: 'multipart/form-data',
          name: `image.jpg`,
        };
        imageFormData.append('image', imageData);

        dispatch(
          postApi(
            API_IMAGE_UPLOAD,
            imageFormData,
            IMAGE_UPLOAD_SUCCESS,
            IMAGE_UPLOAD_ERROR,
          ),
        );
      }
    });
  };
  const renderTextInput = (
    title,
    placeholder,
    value,
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
          value={value}
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
        data={type == 'Category' ? categoryData : employmentData}
      />
      <ScrollView>
        <View style={{padding: 15}}>
          <CommonDropDown
            title={'Category'}
            buttonText={selectedCategory.name}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {renderTextInput(
            'Job Title (Designation)',
            'Job Title (Designation)',
            jobTitle,
            setjobTitle,
          )}
          {renderTextInput(
            'Experience',
            'Work experience you need',
            experience,
            setExperience,
            'number-pad',
          )}
          {renderTextInput(
            'Sallery',
            '10000 - 100000',
            sallery,
            setSallery,
            'number-pad',
          )}
          {renderTextInput(
            'Job Description',
            'Describe your job post, What you need',
            description,
            setDescription,
          )}
          <CommonDropDown
            title={'Employement Type'}
            buttonText={selectedEmployemnetType.name}
            buttonIcon={'ic_category'}
            onDropDwonPress={showDropDown}
          />
          {renderTextInput('Employee Role', 'Employee role', role, setRole)}
          {renderTextInput(
            'Employee Skills',
            'Skills you need for work',
            skill,
            setSkill,
          )}
          {renderTextInput(
            'Qualification',
            'Qualification (Optional)',
            qualificaiton,
            setQualificaiton,
          )}
          {renderTextInput(
            'Vacancy',
            'How many employees you recruit',
            vacancy,
            setVacancy,
            'number-pad',
          )}
          {renderTextInput(
            'Location',
            'Job location (City)',
            location,
            setLocation,
          )}

          <View style={styles.chooseImageContainer}>
            <View style={styles.imageContainer}>
              <Image
                style={
                  selectedImageUri
                    ? styles.imageContainer
                    : {height: 25, width: 25}
                }
                source={{uri: selectedImageUri ? selectedImageUri : 'ic_user'}}
              />
            </View>
            <TouchableOpacity
              style={[styles.chooseImageButton, {width: width - 120}]}
              onPress={() => chooseImage()}>
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
    justifyContent: 'center',
    alignItems: 'center',
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
