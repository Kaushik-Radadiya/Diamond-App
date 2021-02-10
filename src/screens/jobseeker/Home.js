import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import Theme from '../../utils/Theme';
import CommonHeader from '../../component/CommonHeader';
import CommonCard from '../../component/CommonCard';
import {
  API_GET_JOB_CATEGORY,
  API_GET_SEEKER_JOB,
  API_SEEKER_CHANGE_JOB_STATUS,
} from '../../utils/Url';
import {
  GET_SEEKER_JOB_ERROR,
  GET_SEEKER_JOB_SUCCESS,
  SEEKER_RESET,
} from '../../redux/JobSeekerReducer';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import {useDispatch, useSelector} from 'react-redux';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';
import {
  GET_JOB_CATEGORY_ERROR,
  GET_JOB_CATEGORY_SUCCESS,
} from '../../redux/JobProviderReducer';
import ListFooterLoader from '../../component/ListFooterLoader';

let pageNumber = 0;
let isLoadMore = true;
export default function Home({navigation}) {
  // const searchCategoryData = ['Round-cut', 'Fency', 'Greder', 'Syner'];
  const [recommendedJobData, setRecommendedJobData] = useState([]);
  const [searchCategoryData, setSearchCategory] = useState([]);
  const dispatch = useDispatch();
  const toast = React.useRef(null);
  const [loading, setLoader] = useState(true);
  const [isLoadingMore, setLoadingMore] = useState(false);
  const [searchText, setsearchText] = useState('');
  const {seekerJobsData, seekerJobError} = useSelector(
    (state) => state.jobSeeker,
  );
  const {jobcategoryData, jobcategoryError} = useSelector(
    (state) => state.jobProvider,
  );
  const [selectedCategory, setSelectedCategory] = useState(null);

  const getRecommendedJobs = () => {
    pageNumber++;
    const params = {
      all: 0,
      page: pageNumber,
      perPage: 10,
      search: searchText,
      category_id: selectedCategory || '',
      employment_type: '',
    };
    console.log('parmas=====', params);
    dispatch(
      postApi(
        API_GET_SEEKER_JOB,
        params,
        GET_SEEKER_JOB_SUCCESS,
        GET_SEEKER_JOB_ERROR,
      ),
    );
  };

  useEffect(() => {
    if (!jobcategoryData) {
      dispatch(
        postApi(
          API_GET_JOB_CATEGORY,
          {},
          GET_JOB_CATEGORY_SUCCESS,
          GET_JOB_CATEGORY_ERROR,
        ),
      );
    }

    pageNumber = 0;
    isLoadMore = true;
    setRecommendedJobData([]);
    getRecommendedJobs();
  }, [selectedCategory]);

  useEffect(() => {
    if (seekerJobsData) {
      console.log('====seekerJobsData====', seekerJobsData);
      if (seekerJobsData.status == API_RESPONSE_STATUS.STATUS_200) {
        if (
          seekerJobsData.data &&
          seekerJobsData.data.jobs &&
          seekerJobsData.data.jobs.length
        ) {
          const filterdData = seekerJobsData.data.jobs.filter(
            (item) => !item.apply_user && item.is_active,
          );
          const data = recommendedJobData.concat(filterdData);
          setRecommendedJobData(data);
        } else {
          isLoadMore = false;
        }
      }
      setLoadingMore(false);
      setLoader(false);
    }

    if (seekerJobError) {
      console.log('====seekerJobError====', seekerJobError);
      setLoader(false);
      dispatch({type: SEEKER_RESET});
    }

    if (jobcategoryData && !searchCategoryData.length) {
      if (
        jobcategoryData.status == API_RESPONSE_STATUS.STATUS_200 &&
        jobcategoryData.data &&
        jobcategoryData.data.category.length
      ) {
        setSearchCategory(jobcategoryData.data.category);
      } else {
        toast.current.show(jobcategoryData.message);
      }
    }

    if (jobcategoryError) {
      setLoader(false);
      dispatch({type: RESET});
    }
  }, [seekerJobsData, seekerJobError, jobcategoryData, jobcategoryError]);

  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };

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
        getRecommendedJobs();

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

  const searchJobs = () => {
    Keyboard.dismiss();
    setLoader(true);
    getRecommendedJobs();
  };

  const serachByCategory = (id) => {
    setSelectedCategory(selectedCategory == id ? '' : id);
    setLoader(true);
  };

  const loadMoreData = () => {
    if (isLoadMore) {
      setLoadingMore(true);
      getRecommendedJobs();
    }
  };

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        filterPress={onFilterPress}
        isJobAvailable={true}
        navigation={navigation}
      />
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <>
          <View style={[styles.titleContainer]}>
            <Text style={styles.titleText}>Welcome, John</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.search}
                placeholder={'What are you looking for?'}
                onChangeText={(text) => {
                  setsearchText(text);
                }}
                returnKeyType={'search'}
                onSubmitEditing={() => searchJobs()}
                onBlur={() => searchJobs()}
              />
              <TouchableOpacity onPress={() => searchJobs()}>
                <Image
                  style={{height: 25, width: 25}}
                  source={{uri: 'ic_search'}}
                />
              </TouchableOpacity>
            </View>
          </View>
          {recommendedJobData.length ? (
            <View style={{paddingHorizontal: 15, paddingTop: 15, flex: 1}}>
              <Text style={styles.bodyTitle}>Search by Category</Text>
              <FlatList
                contentContainerStyle={{paddingVertical: 10}}
                data={searchCategoryData}
                extraData={searchCategoryData}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={[
                      styles.categoryConatiner,
                      {
                        backgroundColor:
                          selectedCategory == item.id
                            ? Theme.colors.theme
                            : Theme.colors.categoryBg,
                      },
                    ]}
                    onPress={() => serachByCategory(item.id)}>
                    <Text
                      style={[
                        styles.categoryText,
                        {
                          color:
                            selectedCategory == item.id
                              ? Theme.colors.whiteText
                              : Theme.colors.theme,
                        },
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
              />
              <Text style={styles.bodyTitle}>Recommended Job</Text>

              <FlatList
                contentContainerStyle={{paddingBottom: 10}}
                data={recommendedJobData}
                extraData={recommendedJobData}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => index.toString()}
                onEndReached={loadMoreData}
                onEndReachedThreshold={0.5}
                initialNumToRender={10}
                ListFooterComponent={
                  <ListFooterLoader isLoading={isLoadingMore} />
                }
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
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text
                style={{
                  fontFamily: Theme.fontFamily.PoppinsMedium,
                  fontSize: Theme.fontSizes.medium,
                  color: Theme.colors.theme,
                }}>
                No jobs available
              </Text>
            </View>
          ) : null}
        </>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButton: {height: 28, width: 28},
  titleContainer: {
    backgroundColor: Theme.colors.theme,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  titleText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.large,
    color: Theme.colors.whiteText,
  },
  searchContainer: {
    backgroundColor: Theme.colors.whiteText,
    height: 50,
    marginVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 8,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
    includeFontPadding: false,
    padding: 0,
  },
  bodyTitle: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.blackText,
  },
  categoryConatiner: {
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
    // height: 40,
  },
  categoryText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.mini + 1,

    textAlignVertical: 'center',

    includeFontPadding: false,

    height: 20,
  },
});
