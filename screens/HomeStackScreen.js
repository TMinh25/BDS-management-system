import React from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// IMPORT SCREEN
import Home from './Home';
import NewProp from './NewProp';

const HomeStack = createStackNavigator();

export default function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false, }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="NewProp" component={NewProp} />
    </HomeStack.Navigator>
  );
}
