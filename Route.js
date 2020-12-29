// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectAppType from './src/screens/SelectAppType';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import LookingFor from './src/screens/jobseeker/LookingFor';

const Stack = createStackNavigator();

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="SelectAppType" component={SelectAppType} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LookingFor" component={LookingFor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
