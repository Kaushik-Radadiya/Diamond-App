import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import CommonButton from '../../component/CommonButton';

import CommonHeader from '../../component/CommonHeader';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {
  GET_SEEKER_JOB_ERROR,
  GET_SEEKER_JOB_SUCCESS,
} from '../../redux/JobSeekerReducer';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import Theme from '../../utils/Theme';
import {
  API_GET_SEEKER_JOB,
  API_SEEKER_CHANGE_JOB_STATUS,
} from '../../utils/Url';
import {useDispatch, useSelector} from 'react-redux';

export default function JobDetail({navigation, route}) {
  const dispatch = useDispatch();
  const width = useWindowDimensions().width;
  const toast = React.useRef(null);
  const [loading, setLoader] = useState(false);
  const {jobData} = route.params;
  const [isSaved, setSavedJob] = useState(jobData.save_user ? true : false);
  const [isApplied, setJobApplied] = useState(
    jobData.apply_user ? true : false,
  );

  const scrollRef = React.useRef();
  const [jobDetailSelected, setJobDetailSelected] = React.useState(true);

  console.log('========jobData ===', jobData);
  const share = () => {
    console.log('=====share=====');
  };

  const saveJob = () => {
    console.log('===saveJob==', jobData.id);
    if (isSaved) {
      toast.current.show('Job Already Saved');
    } else {
      changeStatus(jobData.id, 'S');
    }
  };
  const applyJob = (id) => {
    console.log('===applyJob==', jobData.id);
    if (isApplied) {
      toast.current.show('Job Already Applied');
    } else {
      changeStatus(jobData.id, 'A');
    }
  };

  const getRecommendedJobs = () => {
    const params = {
      all: 0,
      page: 1,
      perPage: 20,
      search: '',
      category_id: '',
      employment_type: '',
    };
    dispatch(
      postApi(
        API_GET_SEEKER_JOB,
        params,
        GET_SEEKER_JOB_SUCCESS,
        GET_SEEKER_JOB_ERROR,
      ),
    );
  };

  const changeStatus = (id, status) => {
    let params = {
      status: status,
    };
    setLoader(true);
    postApiWithoutDispatch(
      API_SEEKER_CHANGE_JOB_STATUS.replace('{ID}', id),
      params,
    )
      .then((data) => {
        console.log('changeStatusdata======', data);
        setLoader(false);
        getRecommendedJobs();
        if (status == 'A') {
          toast.current.show('Job Applied Successfully', 'SUCCESS');
          setJobApplied(true);
        } else {
          toast.current.show('Job Saved Successfully', 'SUCCESS');
          setSavedJob(true);
        }
      })
      .catch((error) => {
        console.log('changeStatuserror======', error);
        setLoader(false);
      });
  };

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
          {value ? value : '--'}
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
          {title ? title : '--'}
        </Text>
      </View>
    );
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        isBack={true}
        title={'Job Details'}
        navigation={navigation}
        headerRightButtonPress={share}
        headerRightIcon={'ic_share'}
      />
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      <View style={{flex: 1}}>
        <View
          style={{
            height: 80,
            width: '100%',
            backgroundColor: Theme.colors.theme,
            paddingHorizontal: 20,
            justifyContent: 'center',
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row', flex: 9}}>
              <View
                style={[
                  styles.imageContainer,
                  {height: width * 0.12, width: width * 0.12},
                ]}>
                <Image
                  style={{height: width * 0.1, width: width * 0.1}}
                  source={{uri: jobData.image}}></Image>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.title}>{jobData.title}</Text>
                <Text style={styles.subTitle}>
                  {jobData.user && jobData.users.company_name
                    ? jobData.users.company_name
                    : '-'}
                </Text>
              </View>
            </View>
            <Text
              style={styles.subTitle}>{`Vacancy (${jobData.vacancy})`}</Text>
          </View>
        </View>
        <View
          style={{
            height: 40,
            width: '100%',
            backgroundColor: Theme.colors.itemBg,
            borderBottomWidth: 1,
            borderColor: Theme.colors.border,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              height: 40,
              width: 100,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: jobDetailSelected ? 2 : 0,
              borderColor: Theme.colors.theme,
            }}
            onPress={() => {
              setJobDetailSelected(true);
              scrollRef.current.scrollTo({
                y: 0,
                animated: true,
              });
            }}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.PoppinsMedium,
                fontSize: Theme.fontSizes.small,
                color: jobDetailSelected
                  ? Theme.colors.theme
                  : Theme.colors.blackText,
              }}>
              Job Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setJobDetailSelected(false);
              scrollRef.current.scrollToEnd({animated: true});
            }}
            style={{
              height: 40,
              width: 120,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: jobDetailSelected ? 0 : 2,
              borderColor: Theme.colors.theme,
            }}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.PoppinsMedium,
                fontSize: Theme.fontSizes.small,
                color: jobDetailSelected
                  ? Theme.colors.blackText
                  : Theme.colors.theme,
              }}>
              About Company
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{padding: 15, flex: 1}}>
          <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false}>
            <Text style={styles.bodyTitle}>About Job</Text>
            <View style={styles.bodyCardContainer}>
              {renderBodyText('Job Description', jobData.description)}
              {renderBodyText(
                'Location',
                `${jobData.users.city}, ${jobData.users.state}`,
              )}
              {renderBodyText('Designation', jobData.title)}
              {renderBodyText('Experience', jobData.experience)}
              {renderBodyText('Skills', jobData.employee_skills)}
              {renderBodyText('Sallery', jobData.salary)}
              <View style={{flexDirection: 'row'}}>
                {renderBodyText('Role', jobData.employee_role)}
                {renderBodyText(
                  'EmploymentType',
                  jobData.employment_type == 'FT' ? 'Full Time' : 'Part Time',
                )}
              </View>
              {renderBodyText('Education', jobData.qualification)}
            </View>
            <Text style={styles.bodyTitle}>About Company</Text>
            <View style={[styles.bodyCardContainer, {paddingBottom: 10}]}>
              {renderBodyText('Company Name', jobData.users.company_name)}
              {renderBodyText('', jobData.users.company_description)}
              {renderImageAndText('ic_sm_web', jobData.users.company_website)}
              {renderImageAndText('ic_sm_call', jobData.users.company_phone)}
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CommonButton
                buttonStyle={[styles.buttonStyle, {width: width - 100}]}
                text={isApplied ? 'JOB APPLIED' : 'APPLY NOW'}
                textStyle={[styles.buttonTextStyle]}
                buttonPress={applyJob}
              />
              <TouchableOpacity
                onPress={() => saveJob()}
                style={[styles.buttonStyle, {height: 55, width: 60}]}>
                <Image
                  style={{height: 30, width: 30}}
                  source={{
                    uri: isSaved ? 'ic_saved_jobfill' : 'ic_saved_job',
                  }}
                />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: Theme.colors.whiteText,
    borderRadius: 5,
    borderColor: Theme.colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 2,
    color: Theme.colors.whiteText,
  },
  subTitle: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    marginTop: 2,
    color: Theme.colors.whiteText,
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
    includeFontPadding: false,
  },
});
