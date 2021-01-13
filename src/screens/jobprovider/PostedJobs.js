import React, {useState, useEffect} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';
import CommonCard from '../../component/CommonCard';

export default function PostedJobs({navigation}) {
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

  const [postedJobsData, setpostedJobsData] = useState([
    {
      id: 1,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      employApplied: 2,
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      employApplied: 2,
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      employApplied: 2,
    },
  ]);

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Posted Jobs'}
        isJobProvider
        navigation={navigation}
        filterPress={onFilterPress}
      />
      {postedJobsData.length ? (
        <View style={{paddingHorizontal: 15, flex: 1}}>
          <FlatList
            contentContainerStyle={{paddingBottom: 10}}
            showsVerticalScrollIndicator={false}
            data={postedJobsData}
            extraData={postedJobsData}
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
      ) : (
        <View style={styles.noJobContainer}>
          <Text style={styles.noJobText}>Not yet any job post.</Text>
          <CommonButton
            buttonStyle={styles.buttonStyle}
            text={'POST A JOB'}
            textStyle={styles.buttonTextStyle}
            buttonPress={() => navigation.navigate('JobPost')}
          />
        </View>
      )}
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
