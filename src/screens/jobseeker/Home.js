import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ImageBackground,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Theme from '../../utils/Theme';
import CommonHeader from '../../component/CommonHeader';
import CommonCard from '../../component/CommonCard';

export default function Home({navigation}) {
  const searchCategory = ['Round-cut', 'Fency', 'Greder', 'Syner'];
  const [recommendedJobData, setrecommendedJobData] = useState([
    {
      id: 1,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      employApplied: 2,
      note: 'We have given opertunity in siner(Planer).',
      status: 'OPEN',
    },
    {
      id: 2,
      image: 'ic_user',
      title: 'Syner (Planer)',
      subTitle: 'Hari Krishna Diamond PVT. LTD.',
      location: 'Surat, Gujarat',
      experiance: 'Experiance 1 to 5 years',
      postedData: 'Posted 02-10-2020',
      employApplied: 2,
      note: 'We have given opertunity in siner(Planer).',
      status: 'CLOSED',
    },
  ]);
  const onFilterPress = () => {
    console.log('===onFilterPress==');
  };

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={{uri: 'bg'}}
      style={{flex: 1}}>
      <CommonHeader
        filterPress={onFilterPress}
        isJobAvailable={true}
        navigation={navigation}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome, John</Text>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.search}
            placeholder={'What are you looking for?'}
          />
          <Image style={{height: 25, width: 25}} source={{uri: 'ic_search'}} />
        </View>
      </View>
      <View style={{paddingHorizontal: 15, paddingTop: 15, flex: 1}}>
        <Text style={styles.bodyTitle}>Search by Category</Text>
        <FlatList
          style={{paddingVertical: 15}}
          data={searchCategory}
          extraData={searchCategory}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <TouchableOpacity style={styles.categoryConatiner}>
              <Text style={styles.categoryText}>{item}</Text>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.bodyTitle}>Recommended Job</Text>

        <FlatList
          contentContainerStyle={{paddingBottom: 10}}
          data={recommendedJobData}
          extraData={recommendedJobData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => <CommonCard data={item} isJobSeeker />}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  headerButtonContainer: {
    padding: 10,
  },
  headerButton: {height: 28, width: 28},
  titleContainer: {
    backgroundColor: Theme.colors.theme,
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  titleText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.large,
    color: Theme.colors.whiteText,
  },
  searchContainer: {
    backgroundColor: Theme.colors.whiteText,
    height: 50,
    marginVertical: 15,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    flex: 8,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
  },
  bodyTitle: {
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.small,
  },
  categoryConatiner: {
    backgroundColor: Theme.colors.categoryBg,
    justifyContent: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 20,
    borderRadius: 10,
    marginRight: 10,
    height: 40,
  },
  categoryText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.mini + 1,
    color: Theme.colors.theme,
  },
});
