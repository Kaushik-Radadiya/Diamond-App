import React, {useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import CommonCard from '../../component/CommonCard';
import CommonHeader from '../../component/CommonHeader';
import {
  GET_SEEKER_JOB_ERROR,
  GET_SEEKER_JOB_SUCCESS,
  GET_SEEKER_SAVED_JOB_ERROR,
  GET_SEEKER_SAVED_JOB_SUCCESS,
  SEEKER_RESET,
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
import ListFooterLoader from '../../component/ListFooterLoader';

let pageNumber = 0;
let isLoadMore = true;
export default function JobSaved({navigation}) {
  const [savedJobData, setSavedJobData] = useState([]);
  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [loading, setLoader] = useState(false);
  const {savedJobsData, savedJobsError} = useSelector(
    (state) => state.jobSeeker,
  );
  const getSavedJobsData = () => {
    pageNumber++;
    const params = {
      all: 0,
      page: pageNumber,
      perPage: 10,
      search: '',
      category_id: '',
      employment_type: '',
      type: 'S',
    };
    dispatch(
      postApi(
        API_GET_SEEKER_JOB,
        params,
        GET_SEEKER_SAVED_JOB_SUCCESS,
        GET_SEEKER_SAVED_JOB_ERROR,
      ),
    );
  };

  // React.useEffect(() => {
  //   getSavedJobsData();
  // }, []);

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pageNumber = 0;
      isLoadMore = true;
      setSavedJobData([]);
      setLoader(true);
      getSavedJobsData();
    });
    if (savedJobsData) {
      console.log('====savedJobsData====', savedJobsData);
      if (savedJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        if (
          savedJobsData.data &&
          savedJobsData.data.jobs &&
          savedJobsData.data.jobs.length
        ) {
          const data = savedJobData.concat(savedJobsData.data.jobs);
          setSavedJobData(data);
        } else {
          isLoadMore = false;
        }
      }
      setLoadingMore(false);
      setLoader(false);
    }

    if (savedJobsError) {
      console.log('====savedJobsError====', savedJobsError);
      setLoader(false);
      dispatch({type: SEEKER_RESET});
    }
    return unsubscribe;
  }, [savedJobsData, savedJobsError]);

  const saveJob = (id) => {
    console.log('===saveJob==', id);

    // changeStatus(id, 'S');
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
        if (status == 'A') {
          updateStatus(id);
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

  const loadMoreData = () => {
    if (isLoadMore) {
      setLoadingMore(true);
      getSavedJobsData();
    }
  };

  const updateStatus = (id) => {
    let newData = [...savedJobData];
    newData.map((item) => {
      if (item.id == id) {
        item.apply_user = true;
      }
    });

    setSavedJobData(newData);
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
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={<ListFooterLoader isLoading={isLoadingMore} />}
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
