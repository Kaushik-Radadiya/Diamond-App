import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import CommonHeader from '../../component/CommonHeader';
import {
  GET_SEEKER_APPLIED_JOB_ERROR,
  GET_SEEKER_APPLIED_JOB_SUCCESS,
  GET_SEEKER_JOB_ERROR,
  GET_SEEKER_JOB_SUCCESS,
  SEEKER_RESET,
} from '../../redux/JobSeekerReducer';
import {postApi} from '../../utils/APIKit';
import {useDispatch, useSelector} from 'react-redux';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {
  API_GET_SEEKER_JOB,
  
} from '../../utils/Url';
import ListFooterLoader from '../../component/ListFooterLoader';

let pageNumber = 0;
let isLoadMore = true;
export default function JobApplied({navigation}) {
  const width = useWindowDimensions().width;
  const [appliedJobData, setAppliedobData] = useState([]);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [loading, setLoader] = useState(false);
  const {appliedJobsData, appliedJobsError} = useSelector(
    (state) => state.jobSeeker,
  );

  const getAppliedJobsData = () => {
    pageNumber++;
    const params = {
      all: 0,
      page: pageNumber,
      perPage: 10,
      search: '',
      category_id: '',
      employment_type: '',
      type: 'A',
    };
    dispatch(
      postApi(
        API_GET_SEEKER_JOB,
        params,
        GET_SEEKER_APPLIED_JOB_SUCCESS,
        GET_SEEKER_APPLIED_JOB_ERROR,
      ),
    );
  };

  // React.useEffect(() => {
  //   getAppliedJobsData();
  // }, []);
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      pageNumber = 0;
      isLoadMore = true;
      setAppliedobData([]);
      setLoader(true);
      getAppliedJobsData();
    });
    if (appliedJobsData) {
      console.log('====appliedJobsData====', appliedJobsData);
      if (appliedJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        if (
          appliedJobsData.data &&
          appliedJobsData.data.jobs &&
          appliedJobsData.data.jobs.length
        ) {
          const data = appliedJobData.concat(appliedJobsData.data.jobs);
          setAppliedobData(data);
        } else {
          isLoadMore = false;
        }
      }
      setLoadingMore(false);
      setLoader(false);
    }

    if (appliedJobsError) {
      console.log('====appliedJobsError====', appliedJobsError);
      setLoader(false);
      dispatch({type: SEEKER_RESET});
    }
    return unsubscribe;
  }, [appliedJobsData, appliedJobsError]);

  const loadMoreData = () => {
    if (isLoadMore) {
      setLoadingMore(true);
      getAppliedJobsData();
    }
  };

  const renderCard = (data) => {
    // const data = item.jobs;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('JobDetail', {jobData: data});
        }}
        activeOpacity={1}
        style={{
          paddingTop: 15,
        }}>
        <View style={styles.cardContainer}>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.imageContainer,
                  {height: width * 0.14, width: width * 0.14},
                ]}>
                <Image
                  style={{height: width * 0.11, width: width * 0.11}}
                  source={{uri: data.image}}></Image>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subTitle}>
                  {data.users.company_name || '-'}
                </Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={{uri: 'ic_sm_calendar'}}
                />
                <Text
                  style={{
                    fontFamily: Theme.fontFamily.PoppinsRegular,
                    fontSize: Theme.fontSizes.mini,
                    marginLeft: 10,
                    includeFontPadding: false,
                  }}>
                  {`Applied on ${data.updated_at}`}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBackground,
                  {
                    backgroundColor: Theme.colors.greenBg,
                  },
                ]}>
                <Text
                  style={[
                    styles.status,
                    {
                      color: Theme.colors.greenText,
                    },
                  ]}>
                  {'Applied'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Applied Jobs'}
        isJobAvailable={true}
        navigation={navigation}
      />
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      {appliedJobData.length ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            data={appliedJobData}
            extraData={appliedJobData}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            initialNumToRender={10}
            ListFooterComponent={<ListFooterLoader isLoading={isLoadingMore} />}
            renderItem={({item}) => renderCard(item)}
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
            No applied jobs available
          </Text>
        </View>
      ) : null}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
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
    color: Theme.colors.theme,
  },
  subTitle: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    marginTop: 2,
  },
  statusBackground: {
    borderRadius: 5,
    paddingHorizontal: 10,
    // paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini - 1,
    includeFontPadding: false,
    textAlign: 'center',
  },
});
