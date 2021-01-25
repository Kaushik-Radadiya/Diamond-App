import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  FlatList,
  useWindowDimensions,
} from 'react-native';
import CommonHeader from '../../component/CommonHeader';

export default function JobApplied({navigation}) {
  const width = useWindowDimensions().width;
  const [appliedJobData, setAppliedobData] = useState([
    {
      id: 1,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      postedDate: 'Applied on 02-10-2020',
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      postedDate: 'Applied on 02-10-2020',
    },
  ]);

  const renderCard = (data) => {
    return (
      <View
        style={{
          paddingTop: 15,
        }}>
        <View style={styles.cardContainer}>
          <View style={{paddingHorizontal: 10, marginTop: 10}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={[
                  styles.imageContainer,
                  {height: width * 0.14, width: width * 0.14},
                ]}>
                <Image
                  style={{height: width * 0.11, width: width * 0.11}}
                  source={{uri: data.image}}></Image>
              </View>
              <View style={{paddingHorizontal: 10}}>
                <Text style={styles.title}>{data.title}</Text>
                <Text style={styles.subTitle}>{data.subTitle}</Text>
              </View>
            </View>

            <View
              style={{
                paddingVertical: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  alignItems: 'center',
                }}>
                <Image
                  style={{height: 18, width: 18}}
                  source={{uri: 'ic_sm_calendar'}}
                />
                <Text
                  style={{
                    fontFamily: Theme.fontFamily.PoppinsRegular,
                    fontSize: Theme.fontSizes.mini,
                    marginLeft: 10,
                    includeFontPadding: false,
                  }}>
                  {data.postedDate}
                </Text>
              </View>
              <View
                style={[
                  styles.statusBackground,
                  {
                    backgroundColor: Theme.colors.greenBg,
                  },
                ]}>
                <Text
                  style={[
                    styles.status,
                    {
                      color: Theme.colors.greenText,
                    },
                  ]}>
                  {'Applied'}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Applied Jobs'}
        isJobAvailable={true}
        navigation={navigation}
      />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={appliedJobData}
          extraData={appliedJobData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => renderCard(item)}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    backgroundColor: Theme.colors.categoryBg,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Theme.colors.border,
  },
  imageContainer: {
    backgroundColor: Theme.colors.whiteText,
    borderRadius: 5,
    borderColor: Theme.colors.border,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini + 2,
    color: Theme.colors.theme,
  },
  subTitle: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini,
    marginTop: 2,
  },
  statusBackground: {
    borderRadius: 5,
    paddingHorizontal: 10,
    // paddingVertical: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.mini - 1,
    includeFontPadding: false,
    textAlign: 'center',
  },
});
