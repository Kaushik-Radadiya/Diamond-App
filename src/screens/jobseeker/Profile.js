import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function Profile({navigation}) {
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Profile'}
        isJobAvailable={true}
        navigation={navigation}
      />
    </ImageBackground>
  );
}
