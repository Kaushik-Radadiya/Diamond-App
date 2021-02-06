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
} from 'react-native';
import Theme from '../../utils/Theme';
import CommonHeader from '../../component/CommonHeader';
import CommonCard from '../../component/CommonCard';
import {
  API_GET_SEEKER_JOB,
  API_SEEKER_CHANGE_JOB_STATUS,
} from '../../utils/Url';
import {
  GET_SEEKER_JOB_ERROR,
  GET_SEEKER_JOB_SUCCESS,
} from '../../redux/JobSeekerReducer';
import {postApi, postApiWithoutDispatch} from '../../utils/APIKit';
import {useDispatch, useSelector} from 'react-redux';
import {API_RESPONSE_STATUS} from '../../utils/Constant';
import Loader from '../../component/Loader';
import Toast from '../../component/Toast';

export default function Home({navigation}) {
  const searchCategory = ['Round-cut', 'Fency', 'Greder', 'Syner'];
  const [recommendedJobData, setRecommendedJobData] = useState([]);
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
      perPage: 25,
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
  useEffect(() => {
    getRecommendedJobs();
  }, []);
  useEffect(() => {
    if (seekerJobsData) {
      console.log('====seekerJobsData====', seekerJobsData);
      if (
        seekerJobsData.status == API_RESPONSE_STATUS.STATUS_200 &&
        seekerJobsData.data &&
        seekerJobsData.data.jobs &&
        seekerJobsData.data.jobs.length
      ) {
        const data = seekerJobsData.data.jobs.filter(
          (item) => !item.apply_user && item.is_active,
        );
        setRecommendedJobData(data);
      }
      setLoader(false);
    }

    if (seekerJobError) {
      console.log('====seekerJobError====', seekerJobError);
      setLoader(false);
      dispatch({type: POSTED_JOB_RESET});
    }
  }, [seekerJobsData, seekerJobError]);

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
        filterPress={onFilterPress}
        isJobAvailable={true}
        navigation={navigation}
      />
      <Toast ref={toast} duration={5000} />
      <Loader loading={loading} />
      <View style={[styles.titleContainer]}>
        <Text style={styles.titleText}>Welcome, John</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder={'What are you looking for?'}
          />
          <Image style={{height: 25, width: 25}} source={{uri: 'ic_search'}} />
        </View>
      </View>
      {recommendedJobData.length ? (
        <View style={{paddingHorizontal: 15, paddingTop: 15, flex: 1}}>
          <Text style={styles.bodyTitle}>Search by Category</Text>
          <FlatList
            contentContainerStyle={{paddingVertical: 10}}
            data={searchCategory}
            extraData={searchCategory}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity style={styles.categoryConatiner}>
                <Text style={styles.categoryText}>{item}</Text>
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
            No jobs available
          </Text>
        </View>
      ) : null}
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
    backgroundColor: Theme.colors.categoryBg,
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
    color: Theme.colors.theme,
    textAlignVertical: 'center',

    includeFontPadding: false,

    height: 20,
  },
});
