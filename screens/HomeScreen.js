import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';

// IMPORT COMPONENTS
import FlatListItem from '../components/FlatListItem';
import FAB from '../components/FloatingActionButton';

class HomeScreen extends React.Component {
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<View>
					<Text></Text>
					<FlatListItem item={{ dia_chi: 'Lo 1 232 12312312 3132', dien_tich: '323', huong: 'Đông Bắc', gia_tham_dinh: '300.000.000', ho_ten: 'Nguyễn Trường Minh' }} />
					<FlatListItem item={{ dia_chi: 'Lo 1 232 12312312 3132', dien_tich: '323', huong: 'Đông Bắc', gia_tham_dinh: '30.000.000', ho_ten: 'Vũ Nguyễn Đức Khôi' }} />
					<FlatListItem item={{ dia_chi: 'Lo 1 232 12312312 3132', dien_tich: '323', huong: 'Đông Bắc', gia_tham_dinh: '5.000.000', ho_ten: 'Lê Mạnh Đức' }} />
				</View>
				<FAB title="+" onPress={() => { Alert.alert('abc') }} />
			</SafeAreaView>
		);
	}
}
export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 20,
		height: '100%',
	},
})