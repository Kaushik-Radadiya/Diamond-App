import React from 'react';
import {setClientToken} from '../utils/APIKit';
import {APPTYPE, TOKEN} from '../utils/Constant';
import {getData} from '../utils/Utils';

export default function Splash({navigation}) {
  React.useEffect(() => {
    navigate();
  }, []);
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

    navigation.navigate(navigateTo);
  };
  return null;
}
