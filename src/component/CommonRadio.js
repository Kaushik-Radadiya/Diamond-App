import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

export default function CommonRadio({...props}) {
  const {
    type,
    buttonText,
    onRadioPress,
    isSelected,
    textColor,
    radioIcon,
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.buttonStyle}
      onPress={() => onRadioPress(type)}>
      <Text
        style={[
          styles.buttonTextStyle,
          {color: isSelected ? Theme.colors.theme : Theme.colors.LightBlack},
        ]}>
        {buttonText}
      </Text>

      <Image
        style={styles.radioIcon}
        source={{uri: isSelected ? 'ic_radiofill' : 'ic_radio'}}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    height: 55,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginVertical: 10,
    backgroundColor: Theme.colors.categoryBg,
    justifyContent: 'space-between',
    width: '48%',
  },
  radioIcon: {height: 25, width: 25},
  buttonTextStyle: {
    flex: 1,
    paddingHorizontal: 5,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 2,
    includeFontPadding: false,
  },
});
