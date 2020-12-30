// In App.js in a new project

import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SelectAppType from './src/screens/SelectAppType';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import LookingFor from './src/screens/jobseeker/LookingFor';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Theme from './src/utils/Theme';
import Home from './src/screens/jobseeker/Home';
import JobApplied from './src/screens/jobseeker/JobApplied';
import JobSaved from './src/screens/jobseeker/JobSaved';
import Profile from './src/screens/jobseeker/Profile';
import Setting from './src/screens/jobseeker/Setting';
import FreelanceJobs from './src/screens/jobseeker/FreelanceJobs';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

const JobAppliedStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="JobApplied" component={JobApplied} />
    </Stack.Navigator>
  );
};
const JobSavedStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="JobSaved" component={JobSaved} />
    </Stack.Navigator>
  );
};
const ProfileStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const JobSeekerDashbord = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          let labelName;
          if (route.name === 'Home') {
            labelName = 'HOME';
          } else if (route.name === 'JobApplied') {
            labelName = 'JOB APPLIED';
          } else if (route.name === 'JobSaved') {
            labelName = 'SAVED JOB';
          } else {
            labelName = 'PROFILE';
          }

          return focused ? (
            <Text
              style={{
                fontFamily: Theme.fontFamily.PoppinsRegular,
                fontSize: Theme.fontSizes.mini,
                color: Theme.colors.theme,
              }}>
              {labelName}
            </Text>
          ) : null;
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ic_homefill' : 'ic_home';
          } else if (route.name === 'JobApplied') {
            iconName = focused ? 'ic_job_appliedfill' : 'ic_job_applied';
          } else if (route.name === 'JobSaved') {
            iconName = focused ? 'ic_saved_jobfill' : 'ic_saved_job';
          } else {
            iconName = focused ? 'ic_profilefill' : 'ic_profile';
          }

          return (
            <Image style={{height: 25, width: 25}} source={{uri: iconName}} />
          );
        },
      })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="JobApplied" component={JobAppliedStack} />
      <Tab.Screen name="JobSaved" component={JobSavedStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'}>
        <Stack.Screen name="SelectAppType" component={SelectAppType} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="LookingFor" component={LookingFor} />
        <Stack.Screen name="Home" component={JobSeekerDashbord} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="FreelanceJobs" component={FreelanceJobs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
