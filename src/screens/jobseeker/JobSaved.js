import React, {useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import CommonCard from '../../component/CommonCard';
import CommonHeader from '../../component/CommonHeader';
import {
  GET_SEEKER_JOB_ERROR,
  GET_SEEKER_JOB_SUCCESS,
} from '../../redux/JobSeekerReducer';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import {useDispatch, useSelector} from 'react-redux';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {
  API_GET_SEEKER_JOB,
  API_SEEKER_CHANGE_JOB_STATUS,
} from '../../utils/Url';

export default function JobSaved({navigation}) {
  const [savedJobData, setSavedJobData] = useState([]);
  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [loading, setLoader] = useState(true);
  const {seekerJobsData, seekerJobError} = useSelector(
    (state) => state.jobSeeker,
  );
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

  React.useEffect(() => {
    if (seekerJobsData) {
      console.log('====seekerJobsData====', seekerJobsData);
      if (
        seekerJobsData.status == API_RESPONSE_STATUS.STATUS_200 &&
        seekerJobsData.data &&
        seekerJobsData.data.jobs &&
        seekerJobsData.data.jobs.length
      ) {
        const data = seekerJobsData.data.jobs.filter((item) => item.save_user);
        setSavedJobData(data);
      }
      setLoader(false);
    }

    if (seekerJobError) {
      console.log('====seekerJobError====', seekerJobError);
      setLoader(false);
      dispatch({type: POSTED_JOB_RESET});
    }
  }, [seekerJobsData, seekerJobError]);

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
        toast.current.show(data.message, 'SUCCESS');
        getRecommendedJobs();
      })
      .catch((error) => {
        console.log('changeStatuserror======', error);
        setLoader(false);
      });
  };

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Saved Jobs'}
        isJobAvailable={true}
        navigation={navigation}
      />
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      {savedJobData.length ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            data={savedJobData}
            extraData={savedJobData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CommonCard
                data={item}
                isJobSeeker
                onSave={saveJob}
                onApply={applyJob}
                navigation={navigation}
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
            No saved job available
          </Text>
        </View>
      ) : null}
    </ImageBackground>
  );
}
