import React, {useState} from 'react';
import {View, Text, ImageBackground, FlatList} from 'react-native';
import CommonCard from '../../component/CommonCard';
import CommonHeader from '../../component/CommonHeader';

export default function JobSaved({navigation}) {
  const [savedJobData, setSavedJobData] = useState([
    {
      id: 1,
      image: 'ic_user',
      title: 'Syner (Planer)',
      description: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experience: 'Experiance 1 to 5 years',
      created_at: 'Posted 02-10-2020',
      employApplied: 2,
      note: 'We have given opertunity in siner(Planer).',
      status: 'OPEN',
      isSaved: true,
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      description: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experience: 'Experiance 1 to 5 years',
      created_at: 'Posted 02-10-2020',
      employApplied: 2,
      note: 'We have given opertunity in siner(Planer).',
      status: 'CLOSED',
      isSaved: true,
    },
  ]);
  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        title={'Saved Jobs'}
        isJobAvailable={true}
        navigation={navigation}
      />
      <View style={{paddingHorizontal: 15, flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={savedJobData}
          extraData={savedJobData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CommonCard data={item} isJobSeeker />}
        />
      </View>
    </ImageBackground>
  );
}
