import 'react-native-gesture-handler';
import * as React from 'react';
import Route from './Route';
import {Provider as StoreProvider} from 'react-redux';
import store from './src/redux/Store';
import {SafeAreaView} from 'react-native';

export default function App() {
  return (
    <StoreProvider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <Route />
      </SafeAreaView>
    </StoreProvider>
  );
}
