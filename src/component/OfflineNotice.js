import React from 'react';
import {View, Text, Dimensions, StyleSheet} from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Theme from '../utils/Theme';

const {width} = Dimensions.get('window');

export default function OfflineNotice() {
  const [isConnected, setisConnected] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      console.log('Connection type', state.type);
      console.log('Is connected?', state.isConnected);

      setisConnected(state.isConnected);
    });
    return () => {
      unsubscribe;
    };
  }, []);

  return !isConnected ? (
    <View
      style={{
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        position: 'absolute',
        backgroundColor: 'transparent',
      }}>
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>No Internet Connection</Text>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  offlineContainer: {
    backgroundColor: '#b52424',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width,
    // top: 30,
  },
  offlineText: {color: '#fff'},
});
