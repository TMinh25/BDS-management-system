import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// IMPORT COMPONENTS
import FlatListItem from '../components/FlatListItem';
import FAB from '../components/FloatingActionButton';
import randomColor from '../components/randomColor';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

export default function Home({navigation}) {
  const [flatListData, setFlatListData] = React.useState([]);
  React.useEffect(() => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT user_tbl.ho_ten, user_tbl.sdt, bds_tbl.* FROM user_tbl LEFT JOIN bds_tbl WHERE bds_tbl.user_id = user_tbl.user_id',
        [],
        (tx, results) => {
          console.log('Số bất động sản đang giao bán:' + results.rows.length);
          var temp = [];
          for (let i = 0; i < results.rows.length; i++) {
            let item = results.rows.item(i);
            temp.push(item);
            // console.log(item['sdt']);
            // console.log('-------------------------------------');
          }
          setFlatListData(temp);
        },
      );
    });
  }, []);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {flatListData.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.caption}>Chưa có bất động sản nào hết!</Text>
            <Text style={styles.caption}>
              Hãy đăng một mặt hàng nếu bạn muốn bán tài sản...
            </Text>
          </View>
        ) : (
          <FlatList
            data={flatListData}
            // keyExtractor={(item) => item.bds_id.toString()}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <FlatListItem
                backgroundColor={randomColor({
                  hue: 'random',
                  luminosity: 'light',
                })}
                item={item}
              />
            )}
          />
        )}
        <FAB
          title="+"
          style={{backgroundColor: '#30B7FF'}}
          onPress={() => {
            navigation.navigate('NewProp');
          }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 20,
    height: '100%',
    backgroundColor: 'white',
  },
  caption: {
    fontSize: 13,
    textAlign: 'center',
    color: 'gray',
  },
});
