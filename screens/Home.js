import React from 'react';
import { View, Text, SafeAreaView, StyleSheet, FlatList, Alert } from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// IMPORT COMPONENTS
import FlatListItem from '../components/FlatListItem';
import FAB from '../components/FloatingActionButton';

const db = SQLite.openDatabase({ name: 'BDSonline.db' });

export default function Home({ navigation }) {
	const [flatListData, setFlatListData] = React.useState([]);
	React.useEffect(() => {
		db.transaction(
			(tx) => {
				tx.executeSql(
					'SELECT user_tbl.ho_ten, bds_tbl.* FROM user_tbl LEFT JOIN bds_tbl ON user_tbl.user_id = bds_tbl.user_id',
					[],
					(tx, results) => {
						console.log("abc:" + results.rows.length);
						var temp = [];
						for (let i = 0; i < results.rows.length; i++) {
							item = results.rows.item(i);
							temp.push(item);
							console.log(item['user_tbl.ho_ten']);
							console.log('-------------------------------------------');
						}
						setFlatListData(temp);
					}
				)
			}
		)
	}, []);
	return (
		<>
			<SafeAreaView style={styles.container}>
				{/* <View>
					<FlatListItem item={{ dia_chi: 'Lô 1 Ô góc 99, đường Nguyễn Thượng Hiền, Hồng Hà, Hạ Long, Quảng Ninh', dien_tich: '323', huong: 'Đông Bắc', gia_tham_dinh: '300.000.000', ho_ten: 'Nguyễn Trường Minh' }} />
					<FlatListItem item={{ dia_chi: 'Lo 1 232 12312312 3132', dien_tich: '323', huong: 'Đông Bắc', gia_tham_dinh: '30.000.000', ho_ten: 'Vũ Nguyễn Đức Khôi' }} />
					<FlatListItem item={{ dia_chi: 'Lo 1 232 12312312 3132', dien_tich: '323', huong: 'Đông Bắc', gia_tham_dinh: '5.000.000', ho_ten: 'Lê Mạnh Đức' }} />
				</View> */}
				{flatListData.map(item => {
					return (
						<FlatListItem item={item} />
					);
				})}
				{/* <FlatList
					data={flatListData}
					keyExtractor={(item, index) => index.toString()}
					renderItem={({ item }) => FlatListItem(item)}
				/> */}
				<FAB title="+" onPress={() => { navigation.navigate("NewProp") }} />
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		padding: 20,
		height: '100%',
	},
})

