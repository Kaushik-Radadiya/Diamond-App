import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const CommonButton = ({...props}) => {
  const {buttonStyle, icon, iconStyle, text, textStyle, buttonPress} = props;
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={buttonStyle}
      onPress={() => buttonPress(text)}>
      {icon ? <Image style={iconStyle} source={{uri: icon}} /> : null}
      <Text style={textStyle}>{text}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;
