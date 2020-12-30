import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function JobApplied({navigation}) {
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
    </ImageBackground>
  );
}
