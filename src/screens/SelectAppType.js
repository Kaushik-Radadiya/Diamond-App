import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import CommonButton from '../component/CommonButton';
import {APPTYPE} from '../utils/Constant';
import Theme from '../utils/Theme';
import {storeData} from '../utils/Utils';

export default function SelectAppType({navigation}) {
  const window = useWindowDimensions();

  const [isJobSeekerSelected, setJobSeekerSelected] = useState(false);
  const [isJobProviderSelected, setJobProviderSelected] = useState(false);
  const [isSellerSelected, setSellerSelected] = useState(false);

  const commonButtonPress = (item) => {
    console.log('====item====', item);

    if (item == APPTYPE.JOBSEEKER) {
      setJobSeekerSelected(true);
      setJobProviderSelected(false);
      setSellerSelected(false);
    } else if (item == APPTYPE.JOBPROVIDER) {
      setJobSeekerSelected(false);
      setJobProviderSelected(true);
      setSellerSelected(false);
    } else {
      setJobSeekerSelected(false);
      setJobProviderSelected(false);
      setSellerSelected(true);
    }

    if (item != APPTYPE.SELLER) {
      storeData(APPTYPE.TYPE, item);
      navigation.navigate('Login', {apptype: item});
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>Welcome To Diamond Jobs</Text>
          <Text style={{fontFamily: Theme.fontFamily.PoppinsRegular}}>
            You can now find the job that suits you
          </Text>
          <Image
            style={[
              styles.welcomeImage,
              {
                width: window.width * 0.8,
                height: window.width * 0.8,
              },
            ]}
            source={{uri: 'welcome_icon'}}
          />
        </View>
        <View style={styles.bootomSubContainer}>
          <Text style={[styles.titleText, {marginBottom: 15}]}>
            Select Your Type
          </Text>
          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: isJobSeekerSelected
                  ? Theme.colors.theme
                  : Theme.colors.categoryBg,
              },
            ]}
            icon={isJobSeekerSelected ? 'ic_jobseekerfill' : 'ic_jobseeker'}
            iconStyle={[styles.buttonIconStyle]}
            text={APPTYPE.JOBSEEKER}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: isJobSeekerSelected
                  ? Theme.colors.whiteText
                  : Theme.colors.blackText,
              },
            ]}
            buttonPress={commonButtonPress}
          />
          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: isJobProviderSelected
                  ? Theme.colors.theme
                  : Theme.colors.categoryBg,
              },
            ]}
            icon={
              isJobProviderSelected ? 'ic_jobproviderfill' : 'ic_jobprovider'
            }
            iconStyle={styles.buttonIconStyle}
            text={APPTYPE.JOBPROVIDER}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: isJobProviderSelected
                  ? Theme.colors.whiteText
                  : Theme.colors.blackText,
              },
            ]}
            buttonPress={commonButtonPress}
          />
          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: isSellerSelected
                  ? Theme.colors.theme
                  : Theme.colors.categoryBg,
              },
            ]}
            icon={isSellerSelected ? 'ic_sellerfill' : 'ic_seller'}
            iconStyle={styles.buttonIconStyle}
            text={APPTYPE.SELLER}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: isSellerSelected
                  ? Theme.colors.whiteText
                  : Theme.colors.blackText,
              },
            ]}
            buttonPress={commonButtonPress}
          />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  titleText: {
    fontSize: Theme.fontSizes.large,
    fontFamily: Theme.fontFamily.PoppinsMedium,
  },
  welcomeImage: {
    marginVertical: 15,
  },
  topSubContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  bootomSubContainer: {
    paddingHorizontal: 40,
  },
  buttonStyle: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 25,
    flexDirection: 'row',
    marginVertical: 5,
  },
  buttonIconStyle: {height: 35, width: 35},
  buttonTextStyle: {
    paddingHorizontal: 20,
    fontFamily: Theme.fontFamily.PoppinsRegular,
    fontSize: Theme.fontSizes.large,
  },
});
