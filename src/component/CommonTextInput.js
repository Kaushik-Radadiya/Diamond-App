import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
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
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    marginVertical: 8,
  },
  iconStyle: {height: 25, width: 25},
  textInputStyle: {
    height: 55,
    flex: 1,
    marginLeft: 8,

    fontSize: Theme.fontSizes.small,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    marginTop: Platform.OS == 'ios' ? 0 : 5,
  },
});
