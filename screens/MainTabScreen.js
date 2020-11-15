import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

import Icon from 'react-native-vector-icons/Ionicons';
// import { NavigationContainer } from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
// IMPORT COMPONENTS

// IMPORT SCREEN
import SettingScreen from './SettingScreen';
import HomeStackScreen from './HomeStackScreen';
import ProfileStackScreen from './ProfileStackScreen';

let db = SQLite.openDatabase({name: 'BDSonline.db'});
if (!db) {
  console.log('Could not connect to database!');
} else {
  console.log('Database connected!');
}

const Tab = createMaterialTopTabNavigator();

function MainTabScreen({navigation}) {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      backBehavior="none"
      tabBarPosition="bottom"
      lazy={true}
      // lazyPlaceholder={
      //   <View>
      //     <Text>Loading</Text>
      //   </View>
      // }
      swipeEnabled={true}>
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Hồ sơ',
          // tabBarColor: '#694fad',
          // tabBarIcon: ({ color }) => (
          //   <Icon name="ios-person" color={color} size={26} />
          // ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Trang Chủ',
          // tabBarColor: '#009387',
          // tabBarIcon: ({ color }) => (
          //   <Icon name="ios-home" color={color} size={26} />
          // ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarLabel: 'Cài đặt',
          // tabBarColor: '#009387',
          // tabBarIcon: ({ color }) => (
          //   <Icon name="ios-home" color={color} size={26} />
          // ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabScreen;
