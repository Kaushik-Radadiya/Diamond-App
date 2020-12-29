import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Theme from '../../utils/Theme';

export default function LookingFor() {
  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>What are you looking for?</Text>
          <TouchableOpacity style={styles.skipContainer}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bootomSubContainer}>
          <Text style={{fontFamily: Theme.fontFamily.PoppinsRegular}}>
            Category
          </Text>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonStyle}
            onPress={() => buttonPress(text)}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                style={styles.buttonIconStyle}
                source={{uri: 'ic_category'}}
              />
              <Text
                style={{
                  paddingHorizontal: 15,
                  fontFamily: Theme.fontFamily.PoppinsRegular,
                  fontSize: Theme.fontSizes.small,
                  color: '#1B1E23',
                }}>
                Select Category
              </Text>
            </View>
            <Image style={styles.arrowIcon} source={{uri: 'ic_drop_arrow'}} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  titleText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
  },
  topSubContainer: {
    padding: 15,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  skipContainer: {
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
  },
  skipText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
  },
  bootomSubContainer: {
    flex: 1,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  buttonStyle: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: Theme.colors.categoryBg,
    justifyContent: 'space-between',
  },
  buttonIconStyle: {height: 30, width: 30},
  arrowIcon: {height: 20, width: 20},
  buttonTextStyle: {
    paddingHorizontal: 20,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.large,
  },
});
