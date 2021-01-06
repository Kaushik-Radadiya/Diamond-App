import {Dimensions, Platform, PixelRatio} from 'react-native';

const {width: SCREEN_WIDTH, height: SCREEN_HEIGHT} = Dimensions.get('window');

// based on iphone 5s's scale
const scale = SCREEN_WIDTH / 320;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === 'ios') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  }
}

export default Theme = {
  colors: {
    theme: '#4d43f0',
    categoryBg: '#f1f1fd',
    itemBg: '#f8f8fe',
    border: '#d6d6d6',
    greenText: '#009b31',
    greenBg: '#dbebe5',
    redText: '#b80000',
    redBg: '#e9ced7',
    blackText: '#000000',
    blackBg: '#d4d3d9',
    whiteText: '#ffffff',
    LightBlack: '#1B1E23',
    success: '#22c93d',
    error: '#e63729E5',
  },
  fontFamily: {
    PoppinsBlack: 'Poppins-Black',
    PoppinsBlackItalic: 'Poppins-BlackItalic',
    PoppinsBold: 'Poppins-Bold',
    PoppinsBoldItalic: 'Poppins-BoldItalic',
    PoppinsExtraBold: 'Poppins-ExtraBold',
    PoppinsExtraBoldItalic: 'Poppins-ExtraBoldItalic',
    PoppinsExtraLight: 'Poppins-ExtraLight',
    PoppinsExtraLightItalic: 'Poppins-ExtraLightItalic',
    PoppinsItalic: 'Poppins-Italic',
    PoppinsLight: 'Poppins-Light',
    PoppinsLightItalic: 'Poppins-LightItalic',
    PoppinsMedium: 'Poppins-Medium',
    PoppinsMediumItalic: 'Poppins-MediumItalic',
    PoppinsRegular: 'Poppins-Regular',
    PoppinsSemiBold: 'Poppins-SemiBold',
    PoppinsSemiBoldItalic: 'Poppins-SemiBoldItalic',
    PoppinsThin: 'Poppins-Thin',
    PoppinsThinItalic: 'Poppins-ThinItalic',
  },
  fontSizes: {
    mini: 13,
    small: 16,
    medium: 18,
    large: 20,
    xlarge: 24,
  },
};
