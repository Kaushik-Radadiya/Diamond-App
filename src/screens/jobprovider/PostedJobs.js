import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';
import CommonCard from '../../component/CommonCard';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../component/Loader';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import {
  API_GET_POSTED_JOB,
  API_PROVIDER_CHANGE_JOB_STATUS,
  API_PROVIDER_DELETE_JOB,
} from '../../utils/Url';
import {
  GET_POSTED_JOB_ERROR,
  GET_POSTED_JOB_SUCCESS,
  POSTED_JOB_RESET,
} from '../../redux/JobProviderReducer';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Toast from '../../component/Toast';
import {showAlert} from '../../utils/Utils';
import ListFooterLoader from '../../component/ListFooterLoader';

let pageNumber = 1;
let isLoadMore = true;
export default function PostedJobs({navigation}) {
  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [loading, setLoader] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const {postedJobsData, postedJobError} = useSelector(
    (state) => state.jobProvider,
  );

  const getPostedJobs = () => {
    pageNumber++;
    console.log('=====pageNumber====', pageNumber);
    const params = {
      all: 1,
      page: pageNumber,
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
  useEffect(() => {}, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pageNumber = 0;
      isLoadMore = true;
      setpostedJobsData([]);

      setLoader(true);
      getPostedJobs();
    });

    if (postedJobsData) {
      if (postedJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        if (
          postedJobsData.data &&
          postedJobsData.data.jobs &&
          postedJobsData.data.jobs.length
        ) {
          const data = postedJobs.concat(postedJobsData.data.jobs);
          setpostedJobsData(data);
        } else {
          console.log('=====isloadmore');
          isLoadMore = false;
        }
      }
      setLoadingMore(false);
      setLoader(false);
    }

    if (postedJobError) {
      console.log('====postedJobError====', postedJobError);
      setLoader(false);
      dispatch({type: POSTED_JOB_RESET});
    }

    return unsubscribe;
  }, [navigation, postedJobsData, postedJobError]);

  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };

  const onEmployeeApplied = (data) => {
    console.log('====onEmployeeApplied==', data);
    if (data.applied_count > 0) {
      navigation.navigate('EmployeeApplied', {appliedData : data.applied_user_details});
    }
  };
  const onClosedRecruitment = (id) => {
    console.log('====onClosedRecruitment==', id);
    showConfirmationAlert(
      'Job Close',
      'Are you sure, Want to close this job',
      () => changeStatus(id, 2),
    );
  };
  const onDeactivePost = (id) => {
    console.log('====onDeactivePost==', id);
    showConfirmationAlert(
      'Job Deactive',
      'Are you sure, Want to deactive this job',
      () => changeStatus(id, 0),
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
    setLoader(true);
    postApiWithoutDispatch(
      API_PROVIDER_CHANGE_JOB_STATUS.replace('{ID}', id),
      params,
    )
      .then((data) => {
        console.log('data======', data);
        toast.current.show(data.message, 'SUCCESS');
        removeItem(id);
        setLoader(false);
      })
      .catch((error) => {
        console.log('error======', error);
        setLoader(false);
      });
  };

  const deleteJob = (id) => {
    setLoader(true);
    postApiWithoutDispatch(API_PROVIDER_DELETE_JOB.replace('{ID}', id), {})
      .then((data) => {
        console.log('data======', data);
        toast.current.show(data.message, 'SUCCESS');
        removeItem(id);
        setLoader(false);
      })
      .catch((error) => {
        console.log('error======', error);
        setLoader(false);
      });
  };

  const [postedJobs, setpostedJobsData] = useState([]);

  const removeItem = (id) => {
    let newData = [...postedJobs];
    newData.splice(
      newData.findIndex(function (i) {
        return i.id === id;
      }),
      1,
    );
    setpostedJobsData(newData);
  };
  const loadMoreData = () => {
    if (isLoadMore) {
      setLoadingMore(true);
      getPostedJobs();
    }
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Toast ref={toast} duration={5000} />
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
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={<ListFooterLoader isLoading={isLoadingMore} />}
            renderItem={({item}) => (
              <CommonCard
                data={item}
                onEmployeeApplied={onEmployeeApplied}
                onClosedRecruitment={onClosedRecruitment}
                onDeactivePost={onDeactivePost}
                OnDeletePost={OnDeletePost}
                isPostedJobs={true}
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
