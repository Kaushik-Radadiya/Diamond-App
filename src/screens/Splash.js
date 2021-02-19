import React from 'react';
import {setClientToken} from '../utils/APIKit';
import {APPTYPE, TOKEN , FCM_TOKEN} from '../utils/Constant';
import {getData, storeData} from '../utils/Utils';
import messaging from '@react-native-firebase/messaging';


export default function Splash({navigation}) {
  React.useEffect(() => {
    
    checkNotificationPermission();
    navigate();
  }, []);

  

  async function checkNotificationPermission() {
    const enabled = await messaging().hasPermission();
    console.log("======enabled====",enabled)
    if (enabled) {
      getFCMToken();
    } else {
      requestNotificationPermission();
    }
  }

  /**
   * get fcm token
   * @param { } None
   * @returns { } None
   */
  async function getFCMToken() {
    let fcmToken = await getData(FCM_TOKEN)
    console.log("======fcmtoken===",fcmToken)
    if (!fcmToken) {
      // await messaging().requestPermission()
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        storeData(FCM_TOKEN, fcmToken);
      }
    }
    console.log('FCMTOKEN====>', fcmToken);
  }

  /**
   * ask user for notification permission
   * @param { } None
   * @returns { } None
   */
  async function requestNotificationPermission() {
    try {
      await messaging().requestPermission();
      getFCMToken();
    } catch (error) {
      console.log('permission rejected');
    }
  }

  const navigate = async () => {
    let navigateTo = 'SelectAppType';
    const token = await getData(TOKEN);

    console.log('=====token====', token);
    if (token && token != '') {
      setClientToken(token);
      const appType = await getData(APPTYPE.TYPE);
      console.log('=======apptype===', appType);
      if (appType == APPTYPE.JOBPROVIDER) navigateTo = 'Dashbord';
      else navigateTo = 'Home';
    }

    navigation.reset({
      index: 0,
      routes: [{name: navigateTo}],
    });
  };
  return null;
}
