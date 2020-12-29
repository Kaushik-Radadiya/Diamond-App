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
    width = '100%',
  } = props;

  const [text, setText] = useState('');

  return (
    <TouchableOpacity style={[styles.textInputContainer, {width: width}]}>
      <Image style={styles.iconStyle} source={{uri: icon}} />
      <TextInput
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
    padding: 20,
    height: 60,
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    marginVertical: 10,
  },
  iconStyle: {height: 25, width: 25},
  textInputStyle: {
    height: 50,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 15,
    fontSize: Theme.fontSizes.small,
    fontFamily: Theme.fontFamily.PoppinsRegular,
  },
});
