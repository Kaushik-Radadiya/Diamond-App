import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Theme from '../utils/Theme';

export default function CommonTextinput({...props}) {
  const {
    refs,
    icon,
    placeholder,
    onChangeText,
    returnKeyType,
    onSubmitEditing,
    keyboardType,
    width = '100%',
  } = props;

  const [text, setText] = useState('');

  return (
    <TouchableOpacity style={[styles.textInputContainer, {width: width}]}>
      <Image style={styles.iconStyle} source={{uri: icon}} />
      <TextInput
        keyboardType={keyboardType || 'default'}
        placeholderTextColor={Theme.colors.blackText}
        ref={refs}
        style={styles.textInputStyle}
        placeholder={placeholder}
        onChangeText={(text) => {
          setText(text);
          onChangeText(text);
        }}
        returnKeyType={returnKeyType}
        onSubmitEditing={onSubmitEditing}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 13,
    height: 55,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    marginVertical: 8,
  },
  iconStyle: {height: 23, width: 23},
  textInputStyle: {
    height: 55,
    flex: 1,
    marginLeft: 12,

    fontSize: Theme.fontSizes.small - 1,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    includeFontPadding: false,
  },
});
