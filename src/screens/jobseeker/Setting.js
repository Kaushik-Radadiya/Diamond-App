import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function Setting({navigation}) {
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader isBack={true} title={'Setting'} navigation={navigation} />
    </ImageBackground>
  );
}
