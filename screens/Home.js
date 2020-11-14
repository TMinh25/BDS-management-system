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
        <FAB
          title="+"
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
  },
});
