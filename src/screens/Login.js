import React, {useState, useRef} from 'react';
import {View, Text, ImageBackground, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommonButton from '../component/CommonButton';
import CommonTextInput from '../component/CommonTextInput';
import Theme from '../utils/Theme';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailAddressInput = useRef(null);
  const passwordInput = useRef(null);

  const onLoginButtonPress = () => {
    navigation.reset({
      index: 0,
      routes: [{name: 'LookingFor'}],
    });
  };
  const onFacebookButtonPress = () => {};
  const onGoogleButtonPress = () => {};

  return (
    <View style={styles.container}>
      <ImageBackground
        resizeMode={'stretch'}
        source={{uri: 'bg'}}
        style={styles.image}>
        <View style={styles.topSubContainer}>
          <Text style={styles.titleText}>Login</Text>
        </View>
        <View style={styles.bootomSubContainer}>
          <CommonTextInput
            refs={emailAddressInput}
            icon={'ic_mail'}
            placeholder={'Email Address'}
            onChangeText={(text) => setEmail(text)}
            returnKeyType={'next'}
            onSubmitEditing={() => passwordInput.current.focus()}
          />
          <CommonTextInput
            refs={passwordInput}
            icon={'ic_password'}
            placeholder={'Password'}
            returnKeyType={'done'}
            onChangeText={(text) => setPassword(text)}
            onSubmitEditing={() => {}}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={{flexDirection: 'row-reverse', paddingVertical: 10}}
            onPress={() => {}}>
            <Text style={styles.forgotPassText}>Forgot password</Text>
          </TouchableOpacity>
          <CommonButton
            buttonStyle={[
              styles.buttonStyle,
              {
                backgroundColor: Theme.colors.theme,
                justifyContent: 'center',
              },
            ]}
            text={'LOGIN'}
            textStyle={[
              styles.buttonTextStyle,
              {
                color: Theme.colors.whiteText,
              },
            ]}
            buttonPress={onLoginButtonPress}
          />
          <Text style={styles.continueWithText}>Or Continue With</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <CommonButton
              buttonStyle={[styles.buttonStyle, styles.socialButton]}
              icon={'ic_facebook'}
              iconStyle={styles.buttonIconStyle}
              text={'Facebook'}
              textStyle={[styles.buttonTextStyle]}
              buttonPress={onFacebookButtonPress}
            />
            <CommonButton
              buttonStyle={[styles.buttonStyle, styles.socialButton]}
              icon={'ic_google'}
              iconStyle={styles.buttonIconStyle}
              text={'Google'}
              textStyle={[styles.buttonTextStyle]}
              buttonPress={onGoogleButtonPress}
            />
          </View>
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text
                style={[
                  styles.registerText,
                  {
                    color: Theme.colors.theme,
                    marginHorizontal: 5,
                  },
                ]}>
                REGISTER
              </Text>
            </TouchableOpacity>
          </View>
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
    color: Theme.colors.theme,
  },
  welcomeImage: {
    marginVertical: 15,
  },
  topSubContainer: {
    padding: 35,
  },
  bootomSubContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 25,
  },
  buttonStyle: {
    height: 60,
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 20,
    marginVertical: 5,
  },
  buttonIconStyle: {height: 30, width: 30},
  buttonTextStyle: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
    color: Theme.colors.theme,
    marginLeft: 10,
  },
  textInputStyle: {
    marginHorizontal: 15,
    fontSize: Theme.fontSizes.small,
    fontFamily: Theme.fontFamily.PoppinsRegular,
  },
  forgotPassText: {
    color: Theme.colors.theme,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
  continueWithText: {
    alignSelf: 'center',
    marginVertical: 20,
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
  socialButton: {
    backgroundColor: Theme.colors.categoryBg,
    flexDirection: 'row',
    width: '45%',
  },
  registerContainer: {
    flexDirection: 'row',
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerText: {
    fontFamily: Theme.fontFamily.PoppinsMedium,
    fontSize: Theme.fontSizes.small,
  },
});
