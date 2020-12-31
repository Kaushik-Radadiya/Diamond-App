import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function PostedJobs({navigation}) {
  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };
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
    </ImageBackground>
  );
}
