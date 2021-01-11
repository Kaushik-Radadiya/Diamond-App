import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function JobPost({navigation}) {
  const onInfoPress = () => {};
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        isBack={true}
        title={'Post Job'}
        headerRightButtonPress={onInfoPress}
        headerRightIcon={'ic_info'}
        navigation={navigation}
      />
    </ImageBackground>
  );
}
