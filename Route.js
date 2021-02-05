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
import JobDetail from './src/screens/jobseeker/JobDetail';
import FreelanceJobs from './src/screens/jobseeker/FreelanceJobs';
import Dashbord from './src/screens/jobprovider/Dashbord';
import AllJobs from './src/screens/jobprovider/AllJobs';
import PostedJobs from './src/screens/jobprovider/PostedJobs';
import ProviderProfile from './src/screens/jobprovider/ProviderProfile';
import JobPost from './src/screens/jobprovider/JobPost';
import EmployeeApplied from './src/screens/jobprovider/EmployeeApplied';
import SocialRegister from './src/screens/SocialRegister';
import Splash from './src/screens/Splash';

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

const DashbordStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="Dashbord" component={Dashbord} />
    </Stack.Navigator>
  );
};

const PostedJobsStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="PostedJobs" component={PostedJobs} />
      <Stack.Screen name="EmployeeApplied" component={EmployeeApplied} />
    </Stack.Navigator>
  );
};
const AllJobsStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="AllJobs" component={AllJobs} />
    </Stack.Navigator>
  );
};
const ProviderProfileStack = () => {
  return (
    <Stack.Navigator headerMode={'none'}>
      <Stack.Screen name="ProviderProfile" component={ProviderProfile} />
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const JobSeekerDashbord = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {height: 50},
      }}
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
                fontSize: Theme.fontSizes.mini - 1,
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
            <Image style={{height: 22, width: 22}} source={{uri: iconName}} />
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

const JobProviderDashbord = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {height: 50},
      }}
      screenOptions={({route}) => ({
        tabBarLabel: ({focused}) => {
          let labelName;
          if (route.name === 'Dashbord') {
            labelName = 'HOME';
          } else if (route.name === 'PostedJobs') {
            labelName = 'POSTED JOB';
          } else if (route.name === 'AllJobs') {
            labelName = 'ALL JOBS';
          } else {
            labelName = 'PROFILE';
          }

          return focused ? (
            <Text
              style={{
                fontFamily: Theme.fontFamily.PoppinsRegular,
                fontSize: Theme.fontSizes.mini - 1,
                color: Theme.colors.theme,
              }}>
              {labelName}
            </Text>
          ) : null;
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Dashbord') {
            iconName = focused ? 'ic_homefill' : 'ic_home';
          } else if (route.name === 'PostedJobs') {
            iconName = focused ? 'ic_postedjobfill' : 'ic_postedjob';
          } else if (route.name === 'AllJobs') {
            iconName = focused ? 'ic_alljobsfill' : 'ic_alljobs';
          } else {
            iconName = focused ? 'ic_profilefill' : 'ic_profile';
          }

          return (
            <Image style={{height: 22, width: 22}} source={{uri: iconName}} />
          );
        },
      })}>
      <Tab.Screen name="Dashbord" component={DashbordStack} />
      <Tab.Screen name="PostedJobs" component={PostedJobsStack} />
      <Tab.Screen name="AllJobs" component={AllJobsStack} />
      <Tab.Screen name="ProviderProfileS" component={ProviderProfileStack} />
    </Tab.Navigator>
  );
};

const Route = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode={'none'} initialRouteName={'Splash'}>
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="SelectAppType" component={SelectAppType} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="SocialRegister" component={SocialRegister} />
        <Stack.Screen name="LookingFor" component={LookingFor} />
        <Stack.Screen name="Home" component={JobSeekerDashbord} />
        <Stack.Screen name="Dashbord" component={JobProviderDashbord} />
        <Stack.Screen name="JobDetail" component={JobDetail} />
        <Stack.Screen name="Setting" component={Setting} />
        <Stack.Screen name="FreelanceJobs" component={FreelanceJobs} />
        <Stack.Screen name="JobPost" component={JobPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Route;
