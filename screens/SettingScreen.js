import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import MyButton from '../components/MyButton';
function SettingScreen({ navigation }) {
	return (
		<SafeAreaView>
			<View>
				<Text>Setting!</Text>
				{/* <MyButton title="Đăng xuất" onPress={navigation.navigate("SignIn")} /> */}
			</View>
		</SafeAreaView>
	);
}
export default SettingScreen;