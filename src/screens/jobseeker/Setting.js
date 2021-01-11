import React from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';

const SETTINGITEMS = {
  ABOUT_US: 'About us',
  CONTACT_US: 'Contact us',
  PRIVACY_POLICY: 'Privacy Policy',
  TERMS_AND_CONDITION: 'Terms and Condition',
  RATE_APP: 'Rate App',
};

export default function Setting({navigation}) {
  const onItemPress = (title) => {
    switch (title) {
      case SETTINGITEMS.ABOUT_US:
        break;
      case SETTINGITEMS.CONTACT_US:
        break;
      case SETTINGITEMS.PRIVACY_POLICY:
        break;
      case SETTINGITEMS.TERMS_AND_CONDITION:
        break;
      case SETTINGITEMS.RATE_APP:
        break;

      default:
        break;
    }
  };
  const renderSettingItem = (title, isLast = false) => {
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onItemPress(title)}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.PoppinsRegular,
            fontSize: Theme.fontSizes.small,
          }}>
          {title}
        </Text>
        {!isLast ? (
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: Theme.colors.border,
              marginVertical: 15,
            }}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader isBack={true} title={'Setting'} navigation={navigation} />
      <View style={{flex: 1, padding: 15}}>
        <View
          style={{
            backgroundColor: Theme.colors.itemBg,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: Theme.colors.border,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}>
          {renderSettingItem(SETTINGITEMS.ABOUT_US)}
          {renderSettingItem(SETTINGITEMS.CONTACT_US)}
          {renderSettingItem(SETTINGITEMS.PRIVACY_POLICY)}
          {renderSettingItem(SETTINGITEMS.TERMS_AND_CONDITION)}
          {renderSettingItem(SETTINGITEMS.RATE_APP, true)}
        </View>
      </View>
    </ImageBackground>
  );
}
