import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Theme from '../../utils/Theme';
import CommonHeader from '../../component/CommonHeader';

export default function Home({navigation}) {
  const onFilterPress = () => {
    console.log('===onFilterPress==');
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
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButton: {height: 28, width: 28},
});
