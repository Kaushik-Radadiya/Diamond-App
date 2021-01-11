import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import CommonButton from '../../component/CommonButton';
import CommonHeader from '../../component/CommonHeader';
import Theme from '../../utils/Theme';

export default function EmployeeApplied({navigation}) {
  const [isMoreDetailVisible, setisMoreDetailVisible] = useState(false);
  const [appliedJobData, setappliedJobData] = useState([
    {
      id: 1,
      image: 'ic_user',
      name: 'John Doe',
      email: 'Jhondoe@gmail.com',
      mobile: '0123456789',
      job_status: 'Krishna Diamond PVT. LTD. ( Running )',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      applied_date: '02-10-2020',
      skills: ['Syner', 'Colur Paurity', 'Fency'],
      isMoreDetailVisible: false,
    },
    {
      id: 1,
      image: 'ic_user',
      name: 'John Doe',
      email: 'Jhondoe@gmail.com',
      mobile: '0123456789',
      job_status: 'Krishna Diamond PVT. LTD. ( Running )',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      applied_date: '02-10-2020',
      skills: ['Syner', 'Colur Paurity', 'Fency'],
      isMoreDetailVisible: false,
    },
  ]);

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
              onPress={() => {}}>
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
          <Text style={styles.titleText}>{item.name}</Text>
          {renderBodyItem('Email', item.email, 'ic_mail_white')}
          {renderBodyItem('Mobile No', item.mobile, 'ic_call_white')}
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
              {renderBodyItem('Current Job Status', item.job_status)}
              <View style={{flexDirection: 'row'}}>
                {renderBodyItem('Experiance', item.experiance, null, '50%')}
                {renderBodyItem('Applied Date', item.applied_date, null, '50%')}
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
                  data={item.skills}
                  extraData={item.skills}
                  horizontal
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
  },
});
