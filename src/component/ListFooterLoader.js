import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';

export default function ListFooterLoader({...props}) {
  const {isLoading} = props;
  if (isLoading) {
    return (
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: 50,
          paddingVertical: 20,
          marginTop: 10,
          marginBottom: 10,
        }}>
        <ActivityIndicator animating size="large" color={Theme.colors.theme} />
      </View>
    );
  } else {
    return null;
  }
}
