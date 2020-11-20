import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
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

function PropSettingDetailsScreen({navigation, route}) {
  const ID = route.params.ID;
  let [editable, setEditable] = useState(false);
  const [prop, setProp] = useState([]);
  var [diachi, setDiachi] = useState('');
  var [dientich, setDientich] = useState('');
  var [huong, setHuong] = useState('');
  var [giathamdinh, setGiathamdinh] = useState('');
  var [ghichu, setGhichu] = useState('');

  function setAllProp() {
    setDiachi(prop['dia_chi']);
    setDientich(prop['dien_tich'].toString());
    setHuong(prop['huong']);
    setGiathamdinh(prop['gia_tham_dinh'].toString());
    setGhichu(prop['ghi_chu']);
  }

  React.useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prop['bds_id']]);

  function loadData() {
    console.log('id: ' + ID);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM bds_tbl WHERE bds_id=?',
        [ID],
        (tx, results) => {
          if (results.rows.length === 1) {
            console.log('Tìm thấy tài sản');
            setProp(results.rows.item(0));
            setAllProp();
            // setDiachi(prop['dia_chi']);
            // setDientich(prop['dien_tich'].toString());
            // setHuong(prop['huong']);
            // setGiathamdinh(prop['gia_tham_dinh'].toString());
            // setGhichu(prop['ghi_chu']);
          } else {
            console.log('Lỗi không tìm thấy tài sản');
          }
        },
      );
    });
  }

  let updateProp = () => {
    console.log(diachi, dientich, huong, giathamdinh, ghichu);
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE bds_tbl SET dia_chi=?, dien_tich=?, huong=?, gia_tham_dinh=?, ghi_chu=? WHERE bds_id=?',
        [diachi, dientich, huong, giathamdinh, ghichu, ID],
        (tx, results) => {
          console.log('Executed query');
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công rồi',
              'Thay đổi thông tin tài sản thành công nhaaa',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    // setEditable(!editable);
                    navigation.goBack();
                  },
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Thất bại rồi!');
          }
        },
      );
    });
  };

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
          <View
            style={styles.textInputWrapper}
            pointerEvents={editable ? 'auto' : 'none'}>
            <MyTextInput
              style={styles.textInput}
              value={diachi}
              placeholder="Địa chỉ"
              onChangeText={(val) => {
                setDiachi(val);
              }}
            />
            <MyTextInput
              style={styles.textInput}
              placeholder="Diện tích"
              value={dientich}
              keyboardType="numeric"
              onChangeText={(val) => {
                setDientich(val);
              }}
            />
            <MyTextInput
              style={styles.textInput}
              placeholder="Hướng"
              value={huong}
              onChangeText={(val) => {
                setHuong(val);
              }}
            />
            <MyTextInput
              style={styles.textInput}
              placeholder="Giá thẩm định"
              value={giathamdinh}
              keyboardType="numeric"
              onChangeText={(val) => {
                setGiathamdinh(val);
              }}
            />
            <MyTextInput
              style={styles.textInput}
              value={ghichu}
              placeholder="Ghi chú"
              onChangeText={(val) => {
                setGhichu(val);
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.buttonBackgroundColor}>
          {!editable && (
            <View>
              <MyButton
                title="Chỉnh sửa"
                style={{backgroundColor: Color.seaGreen}}
                onPress={() => {
                  setEditable(!editable);
                  Keyboard.dismiss();
                }}
              />
              <MyButton
                title="Xóa"
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
          {editable && (
            <View style={{flexDirection: 'row'}}>
              <View style={{flex: 1}}>
                <MyButton
                  title="Hủy"
                  style={{backgroundColor: Color.redOrange}}
                  onPress={() => {
                    setEditable(!editable);
                    Keyboard.dismiss();
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <MyButton
                  title="Cập nhật"
                  style={{backgroundColor: Color.seaGreen}}
                  onPress={() => {
                    updateProp();
                  }}
                />
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export default PropSettingDetailsScreen;

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
});
