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
} from 'react-native';
import SQLite from 'react-native-sqlite-storage';

// IMPORT COMPONENTS
import MyButton from '../components/MyButton';
import {Color} from '../components/Color';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

function UserSettingDetailsScreen({navigation, route}) {
  const ID = route.params.ID;
  let [editable, setEditable] = useState(false);
  const [user, setUser] = useState([]);

  var [taikhoan, setTaikhoan] = useState('');
  var [matkhau, setMatkhau] = useState('');
  var [power, setPower] = useState('');
  var [hoten, setHoten] = useState('');
  var [sdt, setSdt] = useState('');
  var [gioitinh, setGioitinh] = useState('');
  var [tuoi, setTuoi] = useState('');
  var [avatar, setAvatar] = useState('');
  var [ghichu, setGhichu] = useState('');

  function setAllProp() {
    setTaikhoan(user['tai_khoan']);
    setMatkhau(user['mat_khau']);
    setPower(user['power'].toString());
    setHoten(user['ho_ten']);
    setSdt(user['sdt']);
    setGioitinh(user['gioi_tinh']);
    setTuoi(user['tuoi'].toString());
    setAvatar(user['avatar']);
    setGhichu(user['ghi_chu']);
  }

  React.useEffect(() => {
    loadData();
  }, [user['user_id']]);

  function loadData() {
    console.log('id: ' + ID);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user_tbl WHERE user_id=?',
        [ID],
        (tx, results) => {
          if (results.rows.length === 1) {
            console.log('Tìm thấy người dùng');
            setUser(results.rows.item(0));
            setAllProp();
          } else {
            console.log('Lỗi không tìm thấy người dùng');
            navigation.goBack();
          }
        },
      );
    });
  }

  let updateUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE user_tbl SET tai_khoan=?, mat_khau=?, power=?, ho_ten=?, sdt=?, gioi_tinh=?, tuoi=?, avatar=?, ghi_chu=? WHERE user_id=?',
        [
          taikhoan,
          matkhau,
          power,
          hoten,
          sdt,
          gioitinh,
          tuoi,
          avatar,
          ghichu,
          ID,
        ],
        (tx, results) => {
          console.log('Executed query');
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công rồi',
              'Thay đổi thông tin người dùng thành công nhaaa',
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
        'DELETE FROM user_tbl where user_id=?',
        [ID],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công rồi!',
              'Bạn đã xóa tài khoản thành công.',
              [
                {
                  text: 'OK',
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
            <TextInput
              style={styles.textInput}
              value={taikhoan}
              placeholder="Tài khoản"
              onChangeText={(val) => {
                setTaikhoan(val);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Mật khẩu"
              value={matkhau}
              keyboardType="numeric"
              onChangeText={(val) => {
                setMatkhau(val);
              }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Họ tên"
              value={hoten}
              onChangeText={(val) => {
                setHoten(val);
              }}
            />
            <TextInput
              style={styles.textInput}
              value={sdt}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              onChangeText={(val) => {
                setSdt(val);
              }}
            />
            <TextInput
              style={styles.textInput}
              value={gioitinh}
              placeholder="Giới tính"
              onChangeText={(val) => {
                setGioitinh(val);
              }}
            />
            <TextInput
              style={styles.textInput}
              value={tuoi}
              placeholder="Tuổi"
              keyboardType="phone-pad"
              onChangeText={(val) => {
                setTuoi(val);
              }}
            />
            <TextInput
              style={styles.textInput}
              value={ghichu}
              placeholder="Tiểu sử"
              keyboardType="phone-pad"
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
                // style={{backgroundColor: Color.seaGreen}}
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
                    'Bạn muốn xóa tài khoản này chứ?',
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
            <View>
              {power == 1 &&
              <MyButton
                title="Thăng cấp làm quản trị viên"
                onPress={() => {
                  Alert.alert(
                    'Bạn có chắc muốn thăng cấp thành viên này?',
                    'Thành viên được thăng cấp sẽ có quyền như quản trị viên',
                    [
                      {
                        text: 'Không muốn',
                        onPress: () => {},
                      },
                      {
                        text: 'Thăng cấp luôn',
                        onPress: () => setPower('0'),
                      },
                    ],
                  );
                }}
              />}
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
                      updateUser();
                    }}
                  />
                </View>
              </View>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

export default UserSettingDetailsScreen;

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
