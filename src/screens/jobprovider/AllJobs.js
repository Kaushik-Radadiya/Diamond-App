import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';
import CommonCard from '../../component/CommonCard';
import {useDispatch, useSelector} from 'react-redux';
import {
  GET_ALL_JOB_ERROR,
  GET_ALL_JOB_SUCCESS,
} from '../../redux/JobProviderReducer';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import {postApi} from '../../utils/APIKit';
import {API_GET_POSTED_JOB} from '../../utils/Url';

export default function AllJobs({navigation}) {
  const [allJobs, setAllJObsData] = useState([]);
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(false);
  const {allJobsData, allJobError} = useSelector((state) => state.jobProvider);

  const getAllJobs = () => {
    setLoader(true);
    const params = {
      all: 0,
      page: 1,
      perPage: 10,
      search: '',
    };
    dispatch(
      postApi(
        API_GET_POSTED_JOB,
        params,
        GET_ALL_JOB_SUCCESS,
        GET_ALL_JOB_ERROR,
      ),
    );
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  useEffect(() => {
    if (allJobsData) {
      console.log('====allJobsData====', allJobsData);
      if (allJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        const data = allJobsData.data.jobs;
        setAllJObsData(data);
      }
      setLoader(false);
    }

    if (allJobError) {
      console.log('====postedJobError====', allJobError);
      setLoader(false);
      dispatch({type: POSTED_JOB_RESET});
    }
  }, [allJobsData, allJobError]);

  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };
  const onDeactivePost = (id) => {
    console.log('====onDeactivePost==', id);
  };
  const OnDeletePost = (id) => {
    console.log('====OnDeletePost==', id);
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Loader loading={loading} />
      <CommonHeader
        title={'All Jobs'}
        isJobProvider
        filterPress={onFilterPress}
        navigation={navigation}
      />
      {allJobs.length ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}
            data={allJobs}
            extraData={allJobs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <CommonCard
                data={item}
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
