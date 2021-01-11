import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';

export default function EmployeeApplied({navigation}) {
  const [isMoreDetailVisible, setisMoreDetailVisible] = useState(false);
  const renderBodyItem = (title, value, icon, width = '100%') => {
    return (
      <View
        style={{
          paddingBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: width,
        }}>
        <View>
          <Text
            style={{
              fontFamily: Theme.fontFamily.PoppinsMedium,
              fontSize: Theme.fontSizes.mini - 1,
            }}>
            {title}
          </Text>

          <Text
            style={{
              fontFamily: Theme.fontFamily.PoppinsRegular,
              fontSize: Theme.fontSizes.mini - 1,
            }}>
            {value}
          </Text>
        </View>
        {icon ? (
          <View>
            <TouchableOpacity
              style={{
                padding: 5,
                backgroundColor: Theme.colors.theme,
                borderRadius: 5,
              }}
              activeOpacity={0.8}
              onPress={() => {}}>
              <Image style={{height: 20, width: 20}} source={{uri: icon}} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Posted Jobs'}
        isJobProvider
        navigation={navigation}
      />
      <View style={{flex: 1, padding: 15}}>
        <View style={styles.cardContainer}>
          <View
            style={{
              paddingHorizontal: 15,
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderColor: Theme.colors.border,
            }}>
            <Text
              style={{
                fontFamily: Theme.fontFamily.PoppinsRegular,
                fontSize: Theme.fontSizes.medium,
                color: Theme.colors.theme,
                marginBottom: 15,
              }}>
              John Doe
            </Text>
            {renderBodyItem('Email', 'Jhondoe@gmail.com', 'ic_mail_white')}
            {renderBodyItem('Mobile No', '0123456789', 'ic_call_white')}
          </View>
          {!isMoreDetailVisible ? (
            <CommonButton
              buttonStyle={styles.bottomButtom}
              text={'More Details'}
              textStyle={styles.buttonText}
              buttonPress={() => setisMoreDetailVisible(true)}
            />
          ) : null}
          {isMoreDetailVisible ? (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: Theme.colors.whiteText,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}>
              {renderBodyItem(
                'Current Job Status',
                'Krishna Diamond PVT. LTD. ( Running )',
              )}
              <View style={{flexDirection: 'row'}}>
                {renderBodyItem('Experiance', '5 Years', null, '50%')}
                {renderBodyItem('Applied Data', '02-05-2020', null, '50%')}
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: Theme.fontFamily.PoppinsMedium,
                    fontSize: Theme.fontSizes.mini - 1,
                  }}>
                  Skills
                </Text>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    backgroundColor: Theme.colors.itemBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    width: '100%',
  },
  bottomButtom: {
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: Theme.colors.whiteText,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  buttonText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 1,
    color: Theme.colors.theme,
  },
});
