import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// IMPORT COMPONENTS
import {FlatListItemProp} from '../components/FlatListItem';
import FAB from '../components/FloatingActionButton';
import {Color} from '../components/Color';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

function PropSettingScreen({navigation}) {
  const [flatListData, setFlatListData] = React.useState([]);
  var flatListRef = React.createRef();
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM bds_tbl WHERE user_id=?',
        [global.currentUser.user_id],
        (tx, results) => {
          console.log('Số người dùng:' + results.rows.length);
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadData();
    setRefreshing(false);
    // flatListRef.scrollToIndex({animated: true, index: 0});
    // wait(2000).then(() => setRefreshing(false));
  }, []);
  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.pageTitle}>Quản lý tài sản của bạn</Text>
        {flatListData.length === 0 ? (
          <View
            style={[styles.container, {marginTop: global.dimensionHeight / 2}]}>
            <ScrollView
              // style={styles.container}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }>
              <Text style={styles.caption}>Bạn chưa có tài sản nào!</Text>
              <Text style={styles.caption}>
                Hãy đăng tài sản mới trên trang chủ...
              </Text>
            </ScrollView>
          </View>
        ) : (
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
            renderItem={({item}) => <FlatListItemProp item={item} />}
          />
        )}
      </SafeAreaView>
    </>
  );
}

export default PropSettingScreen;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.jetGray,
    margin: 20,
    textTransform: 'uppercase',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 0,
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
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
