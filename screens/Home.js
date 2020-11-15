import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// IMPORT COMPONENTS
import FlatListItem from '../components/FlatListItem';
import FAB from '../components/FloatingActionButton';
import randomColor from '../components/randomColor';
import {Color} from '../components/Color';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

const wait = (timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function Home({navigation}) {
  const [flatListData, setFlatListData] = React.useState([]);
  var flatListRef = React.createRef();

  React.useEffect(() => {
    loadData();
  }, []);

  function loadData() {
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
          }
          setFlatListData(temp);
        },
      );
    });
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
    flatListRef.scrollToIndex({animated: true, index: 0});
    // wait(2000).then(() => setRefreshing(false));
  }, [flatListRef]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        {flatListData.length === 0 ? (
          <View style={styles.container}>
            <Text style={styles.caption}>Đợi một xíu nghen!</Text>
            <Text style={styles.caption}>
              Để tớ tìm xem có gì cho bạn không...
            </Text>
            {/* <Text style={styles.caption}>Chưa có bất động sản nào hết!</Text>
            <Text style={styles.caption}>
              Hãy đăng một mặt hàng nếu bạn muốn bán tài sản...
            </Text> */}
          </View>
        ) : (
          <>
            <FlatList
              ListHeaderComponent={<View style={{padding: 10}}></View>}
              style={styles.flatList}
              ref={(ref) => {
                flatListRef = ref;
              }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={flatListData.reverse()}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <FlatListItem
                  backgroundColor={randomColor({
                    hue: 'blue',
                    luminosity: 'light',
                  })}
                  item={item}
                />
              )}
            />
          </>
        )}
        <FAB
          title="+"
          style={{backgroundColor: Color.seaGreen, marginBottom: 20}}
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
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 0,
    backgroundColor: 'white',
  },
  caption: {
    fontSize: 13,
    textAlign: 'center',
    color: Color.jetGray,
  },
  flatList: {
    backgroundColor: 'white',
    width: '100%',
  },
});
