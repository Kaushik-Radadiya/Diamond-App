import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import Theme from '../utils/Theme';

export default function CommonDropDown({...props}) {
  const {title, buttonText, buttonIcon, onDropDwonPress} = props;
  return (
    <View style={{paddingVertical: 5}}>
      <Text style={{fontFamily: Theme.fontFamily.PoppinsRegular}}>{title}</Text>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.buttonStyle}
        onPress={() => onDropDwonPress(title)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image style={styles.buttonIconStyle} source={{uri: buttonIcon}} />
          <Text style={styles.buttonTextStyle}>{buttonText}</Text>
        </View>
        <Image style={styles.arrowIcon} source={{uri: 'ic_drop_arrow'}} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    flexDirection: 'row',
    marginVertical: 5,
    backgroundColor: Theme.colors.categoryBg,
    justifyContent: 'space-between',
  },
  buttonIconStyle: {height: 25, width: 25},
  arrowIcon: {height: 20, width: 20},
  buttonTextStyle: {
    paddingHorizontal: 15,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.LightBlack,
    includeFontPadding: false,
  },
});
