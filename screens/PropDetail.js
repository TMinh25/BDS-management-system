// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   SafeAreaView,
//   Image,
//   StyleSheet,
//   Dimensions,
//   TextInput,
//   Keyboard,
//   Alert,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import {createStackNavigator} from '@react-navigation/stack';
// import SQLite from 'react-native-sqlite-storage';
// import ImagePicker from 'react-native-image-picker';

// // IMPORT COMPONENTS
// import {Color} from '../components/Color';
// import MyButton from '../components/MyButton';

// // IMPORT SCREENS
// import {ScrollView} from 'react-native-gesture-handler';
// import MyTextInput from '../components/MyTextInput';

// const db = SQLite.openDatabase({name: 'BDSonline.db'});

// function PropDetail({navigation, route}) {
//   const ID = route.params.ID;
//   console.log(ID);
//   const [prop, setProp] = useState([]);
//   let [diachi, setDiachi] = useState('');
//   let [dientich, setDientich] = useState('');
//   let [huong, setHuong] = useState('');
//   let [giathamdinh, setGiathamdinh] = useState('');
//   let [ghichu, setGhichu] = useState('');
//   let [nguoiban, setNguoiban] = useState('');
//   let [sdt, setSdt] = useState('');

//   function setAllProp() {
//     setDiachi(prop['dia_chi']);
//     setDientich(prop['dien_tich'].toString());
//     setHuong(prop['huong']);
//     setGiathamdinh(prop['gia_tham_dinh'].toString());
//     setGhichu(prop['ghi_chu']);
//     setNguoiban(prop['ho_ten']);
//     setSdt(prop['sdt']);
//   }

//   React.useEffect(() => {
//     loadData();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [prop['bds_id']]);

//   function loadData() {
//     console.log('id: ' + ID);
//     db.transaction((tx) => {
//       tx.executeSql(
//         'SELECT user_tbl.ho_ten, user_tbl.sdt, bds_tbl.* FROM bds_tbl JOIN user_tbl WHERE bds_tbl.user_id = user_tbl.user_id AND bds_id=?',
//         [ID],
//         (tx, results) => {
//           if (results.rows.length === 1) {
//             console.log('Tìm thấy tài sản');
//             setProp(results.rows.item(0));
//             setAllProp();
//           } else {
//             console.log('Lỗi không tìm thấy tài sản');
//           }
//         },
//       );
//     });
//   }

//   let deleteProp = () => {
//     db.transaction((tx) => {
//       tx.executeSql(
//         'DELETE FROM bds_tbl where bds_id=?',
//         [ID],
//         (tx, results) => {
//           if (results.rowsAffected > 0) {
//             Alert.alert(
//               'Thành công rồi!',
//               'Bạn đã xóa tài sản thành công.',
//               [
//                 {
//                   text: 'ok',
//                   onPress: () => navigation.goBack(),
//                 },
//               ],
//               {cancelable: false},
//             );
//           } else {
//             Alert.alert('Thất bại :(');
//             navigation.goBack();
//           }
//         },
//       );
//     });
//   };

//   return (
//     <KeyboardAvoidingView
//       // enabled
//       behavior={Platform.OS === 'ios' ? 'padding' : null}
//       style={styles.flexGrowOne}>
//       <ScrollView bounces={false} style={styles.flexOne}>
//         <View style={styles.textInputWrapper} pointerEvents="none">
//           <MyTextInput style={styles.textInput} value={diachi} />
//           <MyTextInput style={styles.textInput} value={dientich.toString()} />
//           <MyTextInput style={styles.textInput} value={huong} />
//           <MyTextInput
//             style={styles.textInput}
//             value={giathamdinh.toString()}
//           />
//           <MyTextInput style={styles.textInput} value={ghichu} />
//           <MyTextInput style={styles.textInput} value={nguoiban} />
//           <MyTextInput style={styles.textInput} value={sdt} />
//         </View>
//       </ScrollView>
//       {global.currentUser.power == 0 && (
//         <View style={{flex: 1}}>
//           <MyButton
//             title="Xóa"
//             style={{backgroundColor: Color.seaGreen}}
//             onPress={() => {
//               deleteProp();
//             }}
//           />
//         </View>
//       )}
//     </KeyboardAvoidingView>
//   );
// }

// const ProfileStack = createStackNavigator();

// const ProfileStackScreen = ({navigation}) => (
//   <ProfileStack.Navigator screenOptions={{headerShown: false}}>
//     <ProfileStack.Screen name="Hồ sơ" component={PropDetail} />
//   </ProfileStack.Navigator>
// );

// export default ProfileStackScreen;

// const styles = StyleSheet.create({
//   flexGrowOne: {
//     flexGrow: 1,
//   },
//   flexOne: {
//     flex: 1,
//   },
//   textInputWrapper: {
//     flex: 1,
//     // height: 40,
//     margin: 20,
//   },
//   textInput: {
//     padding: 9,
//     color: Color.davyGray,
//     borderWidth: 0,
//   },
//   buttonBackgroundColor: {
//     backgroundColor: '#e6fff9',
//     paddingHorizontal: 10,
//     paddingBottom: 20,
//     paddingTop: 10,
//   },
// });

import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Keyboard,
  Platform,
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// IMPORT COMPONENTS
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {Color} from '../components/Color';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

function PropDetail({navigation, route}) {
  const ID = route.params.ID;
  let [editable, setEditable] = useState(false);
  const [prop, setProp] = useState([]);
  var [diachi, setDiachi] = useState('');
  var [dientich, setDientich] = useState('');
  var [huong, setHuong] = useState('');
  var [giathamdinh, setGiathamdinh] = useState('');
  var [ghichu, setGhichu] = useState('');
  var [nguoiban, setNguoiban] = useState('');
  var [sdt, setSdt] = useState('');

  function setAllProp() {
    setDiachi(prop['dia_chi']);
    setDientich(prop['dien_tich'].toString());
    setHuong(prop['huong']);
    setGiathamdinh(prop['gia_tham_dinh'].toString());
    setGhichu(prop['ghi_chu']);
    setNguoiban(prop['ho_ten']);
    setSdt(prop['sdt']);
  }

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop['bds_id']]);

  function loadData() {
    console.log('id: ' + ID);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT user_tbl.ho_ten, user_tbl.sdt, bds_tbl.* FROM bds_tbl JOIN user_tbl WHERE bds_tbl.user_id = user_tbl.user_id AND bds_id=?',
        [ID],
        (tx, results) => {
          if (results.rows.length === 1) {
            console.log('Tìm thấy tài sản');
            setProp(results.rows.item(0));
            setAllProp();
          } else {
            console.log('Lỗi không tìm thấy tài sản');
          }
        },
      );
    });
  }

  let deleteProp = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM bds_tbl where bds_id=?',
        [ID],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công rồi!',
              'Bạn đã xóa tài sản thành công.',
              [
                {
                  text: 'ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Thất bại :(');
            navigation.goBack();
          }
        },
      );
    });
  };

  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.flexGrowOne}>
        <ScrollView bounces={false} style={styles.flexOne}>
          <View style={styles.textInputWrapper} pointerEvents="none">
            <MyTextInput
              style={styles.textInput}
              value={'Địa chỉ: ' + diachi}
            />
            <MyTextInput
              style={styles.textInput}
              value={'Diện tích: ' + dientich.toString()}
            />
            <MyTextInput style={styles.textInput} value={'Hướng : ' + huong} />
            <MyTextInput
              style={styles.textInput}
              value={'Giá thẩm định: ' + giathamdinh.toString()}
            />
            <MyTextInput
              style={styles.textInput}
              value={'Giới thiệu: ' + ghichu}
            />
            <MyTextInput
              style={styles.textInput}
              value={'Người bán: ' + nguoiban}
            />
            <MyTextInput style={styles.textInput} value={'Liên hệ: ' + sdt} />
          </View>
        </ScrollView>
        <View style={styles.buttonBackgroundColor}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            {(global.currentUser.power == 0 ||
              global.currentUser.user_id == prop['user_id']) && (
              <View style={{flex: 1}}>
                <MyButton
                  title="Xóa tài sản"
                  style={{backgroundColor: Color.redOrange}}
                  onPress={() => {
                    Alert.alert(
                      'Xóa tài sản này?',
                      'Bạn muốn xóa tài sản này chứ?',
                      [
                        {
                          text: 'Không',
                          onPress: () => {},
                        },
                        {
                          text: 'OKE',
                          onPress: () => deleteProp(),
                        },
                      ],
                    );
                  }}
                />
              </View>
            )}
            <View style={{flex: 1}}>
              <MyButton
                title="Quay lại"
                // style={{backgroundColor: Color.seaGreen}}
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export default PropDetail;

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 20,
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
  flexOne: {
    flex: 1,
  },
  flexGrowOne: {
    flexGrow: 1,
  },
  textInput: {
    padding: 9,
    color: Color.davyGray,
    borderWidth: 0,
  },
  textInputWrapper: {
    flex: 1,
    margin: 20,
  },
});
