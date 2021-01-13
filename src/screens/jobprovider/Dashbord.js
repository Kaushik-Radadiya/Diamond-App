import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import Theme from '../../utils/Theme';
import CommonHeader from '../../component/CommonHeader';
import APIKit from '../../utils/APIKit';
import {API_GET_JOB_PROVIDER_DATA} from '../../utils/Url';
import Loader from '../../component/Loader';
import {API_RESPONSE_STATUS} from '../../utils/Constant';

export default function Dashboard({navigation}) {
  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };

  const [jobProviderData, setProviderData] = useState(null);
  const [loading, setLoader] = useState(false);

  useEffect(() => {
    // getProviderData();
  }, []);

  getProviderData = () => {
    setLoader(true);
    APIKit.post(API_GET_JOB_PROVIDER_DATA)
      .then(function (response) {
        console.log('===JobProviderData===', response.data);
        if (response.status == API_RESPONSE_STATUS.STATUS_200) {
          const data = response.data.DATA.data;
          setProviderData(data);
        }
        setLoader(false);
      })
      .catch(function (error) {
        setLoader(false);
        console.log(error);
      });
  };

  const renderCard = (width, iconName, title, count, onButtonPress) => {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => onButtonPress}
        style={[
          styles.cardContainer,
          {
            width: width,
          },
        ]}>
        <Image style={styles.cardIcon} source={{uri: iconName}} />
        <View style={styles.cardTextContainer}>
          <Text style={[styles.cardText, {flex: 2}]}>{title}</Text>
          <Text
            style={[
              styles.cardText,
              {
                flex: 1,
                textAlign: 'right',
                alignSelf: 'flex-end',
              },
            ]}>{`(${count})`}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const onActivePostPress = () => {};
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <Loader loading={loading} />
      <CommonHeader
        filterPress={onFilterPress}
        navigation={navigation}
        isJobProvider
      />
      <View style={{flex: 1, paddingHorizontal: 15, paddingVertical: 20}}>
        <Text
          style={{
            fontFamily: Theme.fontFamily.PoppinsMedium,
            fontSize: Theme.fontSizes.medium,
            color: Theme.colors.theme,
          }}>
          Welcome, Admin
        </Text>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 20,
            justifyContent: 'space-between',
            // backgroundColor: 'red',
          }}>
          {renderCard(
            '48%',
            'ic_postedjobfill',
            'Active Post',
            jobProviderData ? jobProviderData.active.count : '0',
            onActivePostPress,
          )}
          {renderCard(
            '48%',
            'ic_user',
            `Today's Applied user`,
            jobProviderData ? jobProviderData.applied.count : '0',
            onActivePostPress,
          )}
        </View>
        {renderCard(
          '100%',
          'ic_total_post',
          `Total Post`,
          jobProviderData ? jobProviderData.total.count : '0',
          onActivePostPress,
        )}
        <TouchableOpacity
          style={styles.buttonAddPost}
          activeOpacity={1}
          onPress={() => {
            navigation.navigate('JobPost');
          }}>
          <Image
            style={{height: 28, width: 28}}
            source={{uri: 'ic_add_post'}}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButton: {height: 28, width: 28},
  cardContainer: {
    height: 140,
    backgroundColor: Theme.colors.categoryBg,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
    justifyContent: 'space-between',
  },
  cardIcon: {height: 65, width: 65},
  cardTextContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  cardText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.mini + 1,
    color: Theme.colors.theme,
  },
  buttonAddPost: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Theme.colors.theme,
    bottom: 20,
    right: 20,
  },
});
