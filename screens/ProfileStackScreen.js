import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

function ProfileScreen() {
	return (
		<View>
			<Text>Profile!</Text>
		</View>
	);
}

const DetailsStack = createStackNavigator();

const ProfileStackScreen = ({ navigation }) => (
	<DetailsStack.Navigator screenOptions={{ headerShown: false, }}>
		<DetailsStack.Screen name="Hồ sơ" component={ProfileScreen} />
	</DetailsStack.Navigator>
);

export default ProfileStackScreen;
