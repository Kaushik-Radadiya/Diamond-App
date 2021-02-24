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
import ListFooterLoader from '../../component/ListFooterLoader';

let pageNumber = 0;
let isLoadMore = true;
export default function Setting({navigation}) {
  const [freelannceJobData, setFreelannceJobData] = useState([]);

  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [loading, setLoader] = React.useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const {freelannceJobsData, freelanceJobsError} = useSelector(
    (state) => state.jobSeeker,
  );

  const getFreelanceJobsData = () => {
    pageNumber++;
    const params = {
      all: 0,
      page: pageNumber,
      perPage: 10,
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
    pageNumber = 0;
    isLoadMore = true;
    getFreelanceJobsData();
  }, []);
  React.useEffect(() => {
    if (freelannceJobsData) {
      console.log('====freelannceJobsData====', freelannceJobsData);

      if (freelannceJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        if (
          freelannceJobsData.data &&
          freelannceJobsData.data.jobs &&
          freelannceJobsData.data.jobs.length
        ) {
          console.log('====freelannceJobsData========');
          const filterdData = freelannceJobsData.data.jobs.filter(
            (item) => !item.apply_user,
          );
          const data = freelannceJobData.concat(filterdData);
          setFreelannceJobData(data);
        } else {
          isLoadMore = false;
        }
      }
      setLoadingMore(false);
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
        setLoader(false);
        if (status == 'A') {
          removeItem(id);
          toast.current.show('Job Applied Successfully', 'SUCCESS');
        } else {
          updateStatus(id);
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

  const removeItem = (id) => {
    let newData = [...freelannceJobData];
    newData.splice(
      newData.findIndex(function (i) {
        return i.id === id;
      }),
      1,
    );
    setFreelannceJobData(newData);
  };

  const updateStatus = (id) => {
    let newData = [...freelannceJobData];
    newData.map((item) => {
      if (item.id == id) {
        item.save_user = true;
      }
    });

    setFreelannceJobData(newData);
  };
  const loadMoreData = () => {
    if (isLoadMore) {
      setLoadingMore(true);
      getFreelanceJobsData();
    }
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
