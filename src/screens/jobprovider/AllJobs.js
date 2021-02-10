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
  POSTED_JOB_RESET,
} from '../../redux/JobProviderReducer';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import {
  API_GET_POSTED_JOB,
  API_PROVIDER_CHANGE_JOB_STATUS,
  API_PROVIDER_DELETE_JOB,
} from '../../utils/Url';
import Toast from '../../component/Toast';
import {showAlert} from '../../utils/Utils';
import ListFooterLoader from '../../component/ListFooterLoader';

let pageNumber = 0;
let isLoadMore = true;
export default function AllJobs({navigation}) {
  const [allJobs, setAllJObsData] = useState([]);
  const toast = React.useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoader] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const {allJobsData, allJobError} = useSelector((state) => state.jobProvider);

  const getAllJobs = () => {
    pageNumber++;
    const params = {
      all: 0,
      page: pageNumber,
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
    const unsubscribe = navigation.addListener('focus', () => {
      pageNumber = 0;
      isLoadMore = true;
      setAllJObsData([]);
      setLoader(true);
      getAllJobs();
    });

    if (allJobsData) {
      console.log('====allJobsData====', allJobsData);
      if (allJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        if (allJobsData.data && allJobsData.data.jobs && allJobsData.data.jobs.length) {
          const data = allJobs.concat(allJobsData.data.jobs);
          setAllJObsData(data);
        } else {
          isLoadMore = false;
        }
      }
      setLoadingMore(false);
      setLoader(false);
    }

    if (allJobError) {
      console.log('====postedJobError====', allJobError);
      setLoader(false);
      dispatch({type: POSTED_JOB_RESET});
    }
    return unsubscribe;
  }, [navigation, allJobsData, allJobError]);

  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };
  const onDeactivePost = (id, status) => {
    console.log('====onDeactivePost==', id);
    const jobStatus = status == 0 || status == 2;
    showConfirmationAlert(
      jobStatus ? 'Job Active' : 'Job Deactive',
      `Are you sure, Want to ${jobStatus ? 'active' : 'deactive'} this job`,
      () => changeStatus(id, jobStatus ? 1 : 0),
    );
  };
  const OnDeletePost = (id) => {
    console.log('====OnDeletePost==', id);
    showConfirmationAlert(
      'Job Delete',
      'Are you sure, Want to delete this job',
      () => deleteJob(id),
    );
  };

  const showConfirmationAlert = (title, message, callAction) => {
    showAlert(title, message, 'Yes', 'No', callAction, () => {});
  };

  const changeStatus = (id, status) => {
    let params = {
      status: status,
    };

    setLoader(true)
    postApiWithoutDispatch(
      API_PROVIDER_CHANGE_JOB_STATUS.replace('{ID}', id),
      params,
    )
      .then((data) => {
        console.log('changeStatusdata======', data);
        toast.current.show(data.message, 'SUCCESS');
        let newData = [...allJobs];
        newData.map((item) => {
          if (item.id == id) {
            item.is_active = status;
          }
        });

        setAllJObsData(newData);
        setLoader(false);
      })
      .catch((error) => {
        console.log('changeStatuserror======', error);
        setLoader(false);
      });
  };

  const deleteJob = (id) => {
    setLoader(true)
    postApiWithoutDispatch(API_PROVIDER_DELETE_JOB.replace('{ID}', id), {})
      .then((data) => {
        console.log('deleteJobdata======', data);
        toast.current.show(data.message, 'SUCCESS');
        let newData = [...allJobs];
        newData.splice(
          newData.findIndex(function (i) {
            return i.id === id;
          }),
          1,
        );
        setAllJObsData(newData);
        setLoader(false)
      })
      .catch((error) => {
        console.log('deleteJoberror======', error);
        setLoader(false);
      });
  };

  const loadMoreData = () => {
    if (isLoadMore) {
      setLoadingMore(true);
      getAllJobs();
    }
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Loader loading={loading} />
      <Toast ref={toast} duration={5000} />
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
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={<ListFooterLoader isLoading={isLoadingMore} />}
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
