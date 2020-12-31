import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function ProviderProfile({navigation}) {
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader title={'Profile'} isJobProvider navigation={navigation} />
    </ImageBackground>
  );
}
