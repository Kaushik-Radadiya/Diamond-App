import React from 'react';
import {View, Text, ImageBackground} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function Setting({navigation}) {
  const onInfoPress = () => {
    console.log('---onInfoPress--');
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        isBack={true}
        title={'Freelancer Jobs'}
        headerRightButtonPress={onInfoPress}
        headerRightIcon={'ic_info'}
        navigation={navigation}
      />
    </ImageBackground>
  );
}
