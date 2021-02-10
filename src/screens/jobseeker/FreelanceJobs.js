import React, {useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import CommonCard from '../../component/CommonCard';
import CommonHeader from '../../component/CommonHeader';
import {useDispatch, useSelector} from 'react-redux';
import {
  API_GET_SEEKER_JOB,
  API_SEEKER_CHANGE_JOB_STATUS,
} from '../../utils/Url';
import {
  GET_SEEKER_FREELANCE_JOB_ERROR,
  GET_SEEKER_FREELANCE_JOB_SUCCESS,
  SEEKER_RESET,
} from '../../redux/JobSeekerReducer';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';

export default function Setting({navigation}) {
  const [freelannceJobData, setFreelannceJobData] = useState([]);

  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [loading, setLoader] = React.useState(true);
  const {freelannceJobsData, freelanceJobsError} = useSelector(
    (state) => state.jobSeeker,
  );

  const getFreelanceJobsData = () => {
    const params = {
      all: 0,
      page: 1,
      perPage: 25,
      search: '',
      category_id: '',
      employment_type: 'F',
    };
    dispatch(
      postApi(
        API_GET_SEEKER_JOB,
        params,
        GET_SEEKER_FREELANCE_JOB_SUCCESS,
        GET_SEEKER_FREELANCE_JOB_ERROR,
      ),
    );
  };
  React.useEffect(() => {
    getFreelanceJobsData();
  }, []);
  React.useEffect(() => {
    if (freelannceJobsData) {
      console.log('====freelannceJobsData====', freelannceJobsData);
      if (
        freelannceJobsData.status == API_RESPONSE_STATUS.STATUS_200 &&
        freelannceJobsData.data &&
        freelannceJobsData.data.jobs &&
        freelannceJobsData.data.jobs.length
      ) {
        const data = freelannceJobsData.data.jobs.filter(
          (item) => !item.apply_user,
        );
        setFreelannceJobData(data);
      }
      setLoader(false);
    }

    if (freelanceJobsError) {
      console.log('====freelanceJobsError====', freelanceJobsError);
      setLoader(false);
      dispatch({type: SEEKER_RESET});
    }
  }, [freelannceJobsData, freelanceJobsError]);

  const saveJob = (id) => {
    console.log('===saveJob==', id);
    changeStatus(id, 'S');
  };
  const applyJob = (id) => {
    console.log('===applyJob==', id);
    changeStatus(id, 'A');
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
        getFreelanceJobsData();
        if (status == 'A') {
          toast.current.show('Job Applied Successfully', 'SUCCESS');
        } else {
          toast.current.show('Job Saved Successfully', 'SUCCESS');
        }
      })
      .catch((error) => {
        console.log('changeStatuserror======', error);
        setLoader(false);
      });
  };

  const onInfoPress = () => {
    console.log('---onInfoPress--');
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        isBack={true}
        title={'Freelancer Jobs'}
        headerRightButtonPress={onInfoPress}
        headerRightIcon={'ic_info'}
        navigation={navigation}
      />
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      {freelannceJobData.length ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            data={freelannceJobData}
            extraData={freelannceJobData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CommonCard
                data={item}
                isJobSeeker
                onSave={saveJob}
                onApply={applyJob}
                navigation={navigation}
                isFreelanceJob={true}
              />
            )}
          />
        </View>
      ) : !loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text
            style={{
              fontFamily: Theme.fontFamily.PoppinsMedium,
              fontSize: Theme.fontSizes.medium,
              color: Theme.colors.theme,
            }}>
            No Freelancer jobs available
          </Text>
        </View>
      ) : null}
    </ImageBackground>
  );
}
