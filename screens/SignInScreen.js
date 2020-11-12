import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';

db = SQLite.openDatabase({ name: 'BDSonline.db' });
if (!db) {
  console.log('Could not connect to database!');
} else {
  console.log('Database connected!');
}


function SignInScreen({ navigation }) {
  var [taikhoan, setTaikhoan] = React.useState('');
  var [matkhau, setMatkhau] = React.useState('');
  function dangNhap() {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM user_tbl WHERE tai_khoan=? AND mat_khau=?",
        [taikhoan, matkhau],
        function (tx, results) {
          console.log(results.rows.length);
          if (results.rows.length === 1) {
            console.log(results.rows.item(0)['user_id']);
            console.log('Signed In!');
            navigation.navigate('Home');
            // global.currentUser = results.rows.item(0)['user_id'];
            Keyboard.dismiss();
          } else {
            Alert.alert('Sai tài khoản hoặc mật khẩu');
          }
        }, (tx, err) => {
          console.log(err);
        }
      );
    });
    // navigation.navigate("Home");
  };
  return (
    <SafeAreaView>
      <MyTextInput placeHolder="Tài khoản" onChangeText={(val) => { setTaikhoan(val) }} />
      <MyTextInput placeHolder="Mật khẩu" onChangeText={(val) => { setMatkhau(val) }} />
      <MyButton title="Đăng nhập" onPress={dangNhap} />
      <MyButton title="Đăng kí" onPress={() => { navigation.navigate("SignUp") }} />
    </SafeAreaView>
  );
}
export default SignInScreen;
