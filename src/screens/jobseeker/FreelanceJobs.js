import React, {useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import CommonCard from '../../component/CommonCard';
import CommonHeader from '../../component/CommonHeader';

export default function Setting({navigation}) {
  const [freelannceJobData, setFreelannceJobData] = useState([
    {
      id: 1,
      image: 'ic_user',
      title: 'Syner (Planer)',
      description: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experience: 'Experiance 1 to 5 years',
      created_at: 'Posted 02-10-2020',
      note: 'We have given opertunity in siner(Planer).',
      status: 'OPEN',
      isUrgent: true,
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      note: 'We have given opertunity in siner(Planer).',
      status: 'OPEN',
      isUrgent: true,
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      note: 'We have given opertunity in siner(Planer).',
      status: 'OPEN',
      isUrgent: true,
    },
  ]);
  const onInfoPress = () => {
    console.log('---onInfoPress--');
  };
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        isBack={true}
        title={'Freelancer Jobs'}
        headerRightButtonPress={onInfoPress}
        headerRightIcon={'ic_info'}
        navigation={navigation}
      />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={freelannceJobData}
          extraData={freelannceJobData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CommonCard data={item} isJobSeeker />}
        />
      </View>
    </ImageBackground>
  );
}
