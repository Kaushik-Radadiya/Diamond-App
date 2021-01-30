import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';
import CommonCard from '../../component/CommonCard';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../component/Loader';
import {postApi} from '../../utils/APIKit';
import {API_GET_POSTED_JOB} from '../../utils/Url';
import {
  GET_POSTED_JOB_ERROR,
  GET_POSTED_JOB_SUCCESS,
  POSTED_JOB_RESET,
} from '../../redux/JobProviderReducer';
import {API_RESPONSE_STATUS} from '../../utils/Constant';

export default function PostedJobs({navigation}) {
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(false);
  const {postedJobsData, postedJobError} = useSelector(
    (state) => state.jobProvider,
  );

  const getPostedJobs = () => {
    setLoader(true);
    const params = {
      all: 1,
      page: 1,
      perPage: 10,
      search: '',
    };
    dispatch(
      postApi(
        API_GET_POSTED_JOB,
        params,
        GET_POSTED_JOB_SUCCESS,
        GET_POSTED_JOB_ERROR,
      ),
    );
  };
  useEffect(() => {
    getPostedJobs();
  }, []);
  useEffect(() => {
    if (postedJobsData) {
      console.log('====postedJobsData====', postedJobsData);
      if (postedJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        const data = postedJobsData.data.jobs;
        setpostedJobsData(data);
      }
      setLoader(false);
    }

    if (postedJobError) {
      console.log('====postedJobError====', postedJobError);
      setLoader(false);
      dispatch({type: POSTED_JOB_RESET});
    }
  }, [postedJobsData, postedJobError]);

  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };

  const onEmployeeApplied = (id) => {
    console.log('====onEmployeeApplied==', id);
    navigation.navigate('EmployeeApplied');
  };
  const onClosedRecruitment = (id) => {
    console.log('====onClosedRecruitment==', id);
  };
  const onDeactivePost = (id) => {
    console.log('====onDeactivePost==', id);
  };
  const OnDeletePost = (id) => {
    console.log('====OnDeletePost==', id);
  };

  const [postedJobs, setpostedJobsData] = useState([]);

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Loader loading={loading} />
      <CommonHeader
        title={'Posted Jobs'}
        isJobProvider
        navigation={navigation}
        filterPress={onFilterPress}
      />
      {postedJobs.length ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}
            data={postedJobs}
            extraData={postedJobs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CommonCard
                data={item}
                onEmployeeApplied={onEmployeeApplied}
                onClosedRecruitment={onClosedRecruitment}
                onDeactivePost={onDeactivePost}
                OnDeletePost={OnDeletePost}
              />
            )}
          />
        </View>
      ) : !loading ? (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>Not yet any job post.</Text>
          <CommonButton
            buttonStyle={styles.buttonStyle}
            text={'POST A JOB'}
            textStyle={styles.buttonTextStyle}
            buttonPress={() => navigation.navigate('JobPost')}
          />
        </View>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  noJobContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noJobText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
  },
  buttonStyle: {
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginVertical: 10,
    backgroundColor: Theme.colors.theme,
  },
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.whiteText,
  },
});
