import React, {useState} from 'react';
import {View, Text, ImageBackground, StyleSheet, FlatList} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';
import CommonCard from '../../component/CommonCard';

export default function AllJobs({navigation}) {
  const [postedJobsData, setpostedJobsData] = useState([
    {
      id: 1,
      image: 'ic_user',
      title: 'Syner (Planer)',
      description: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experience: 'Experiance 1 to 5 years',
      created_at: 'Posted 02-10-2020',
      status: 'OPEN',
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      description: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experience: 'Experiance 1 to 5 years',
      created_at: 'Posted 02-10-2020',
      status: 'CLOSED',
    },
    {
      id: 3,
      image: 'ic_user',
      title: 'Syner (Planer)',
      description: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experience: 'Experiance 1 to 5 years',
      created_at: 'Posted 02-10-2020',
      status: 'DEACTIVE',
    },
  ]);

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
      <CommonHeader
        title={'All Jobs'}
        isJobProvider
        filterPress={onFilterPress}
        navigation={navigation}
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
