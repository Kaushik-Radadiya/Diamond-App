import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Linking
} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';

export default function EmployeeApplied({navigation, route}) {
  const {appliedData} = route.params
  const [isMoreDetailVisible, setisMoreDetailVisible] = useState(false);
  const [appliedJobData, setappliedJobData] = useState(appliedData)
  

  const sendEmail = (email) => {
    Linking.openURL(`mailto:${email}`)
  }

  const dialCall = (number) => {

    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    }
    else {
      phoneNumber = `telprompt:${number}`;
    }

    Linking.openURL(phoneNumber);
  };
  const renderBodyItem = (title, value, icon, width = '100%') => {
    return (
      <View style={[styles.bodyItemContainer, {width: width}]}>
        <View>
          <Text style={styles.bodyTitle}>{title}</Text>

          <Text style={styles.bodyValue}>{value}</Text>
        </View>
        {icon ? (
          <View>
            <TouchableOpacity
              style={styles.bodyIcon}
              activeOpacity={0.8}
              onPress={() => title == 'Email' ? sendEmail(value) : dialCall(value)}>
              <Image style={styles.image} source={{uri: icon}} />
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  };

  const showHideMoreDetail = (index) => {
    let newData = [...appliedJobData]; // copying the old datas array
    newData[index].isMoreDetailVisible = !newData[index].isMoreDetailVisible; // replace e.target.value with whatever you want to change it to

    setappliedJobData(newData);
  };

  const renderCard = (item, index) => {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.cardTopContainer}>
          <Text style={styles.titleText}>{item.apply_user.name}</Text>
          {renderBodyItem('Email', item.apply_user.email, 'ic_mail_white')}
          {renderBodyItem('Mobile No', item.apply_user.mobile, 'ic_call_white')}
        </View>
        {!item.isMoreDetailVisible ? (
          <CommonButton
            buttonStyle={styles.bottomButtom}
            text={'More Details'}
            textStyle={styles.buttonText}
            buttonPress={() => showHideMoreDetail(index)}
          />
        ) : null}
        {item.isMoreDetailVisible ? (
          <View
            style={{borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <View style={styles.moreDetailContainer}>
              {renderBodyItem('Current Job Status', item.apply_user.company_name)}
              <View style={{flexDirection: 'row'}}>
                {renderBodyItem('Experiance', `${item.apply_user.experience} years`, null, '50%')}
                {renderBodyItem('Applied Date', item.apply_user.updated_at, null, '50%')}
              </View>
              <View>
                <Text
                  style={[
                    styles.bodyTitle,
                    {
                      paddingVertical: 5,
                    },
                  ]}>
                  Skills
                </Text>
                <FlatList
                  data={item.apply_user.skill.split(',')}
                  extraData={item.apply_user.skill.split(',')}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => (
                    <View style={styles.skillContainer}>
                      <Text style={styles.skillText}>{item}</Text>
                    </View>
                  )}
                />
              </View>
            </View>
            <TouchableOpacity
              style={styles.bottomButtom}
              onPress={() => showHideMoreDetail(index)}>
              <Image
                style={{height: 20, width: 25}}
                source={{uri: 'ic_close'}}
              />
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
        <FlatList
          showsVerticalScrollIndicator={false}
          data={appliedJobData}
          extraData={appliedJobData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => renderCard(item, index)}
        />
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
  cardTopContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: Theme.colors.border,
  },
  titleText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.medium,
    color: Theme.colors.theme,
    marginBottom: 15,
  },
  bodyItemContainer: {
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  moreDetailContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Theme.colors.whiteText,
  },
  bodyTitle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.mini - 1,
  },
  bodyValue: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini - 1,
  },
  bodyIcon: {
    padding: 5,
    backgroundColor: Theme.colors.theme,
    borderRadius: 5,
  },
  image: {height: 20, width: 20},
  skillContainer: {
    backgroundColor: Theme.colors.categoryBg,
    paddingVertical: 3,
    paddingHorizontal: 10,
    marginRight: 10,
    borderRadius: 5,
  },
  skillText: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    color: Theme.colors.theme,
    includeFontPadding: false,
  },
});
