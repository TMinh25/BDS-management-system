import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  Alert,
  Keyboard,
} from 'react-native';

import SQLite from 'react-native-sqlite-storage';

import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {Color} from '../components/Color';

let db = SQLite.openDatabase({name: 'BDSonline.db'});
if (!db) {
  console.log('Could not connect to database!');
} else {
  console.log('Database connected!');
}

function SignInScreen({navigation}) {
  var [taikhoan, setTaikhoan] = React.useState('');
  var [matkhau, setMatkhau] = React.useState('');
  global.currentUser = [];
  function dangNhap() {
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT * FROM user_tbl WHERE tai_khoan=? AND mat_khau=?',
        [taikhoan, matkhau],
        function (tx, results) {
          console.log('Có tài khoản: ' + Boolean(results.rows.length));
          if (results.rows.length === 1) {
            let currentUser = results.rows.item(0);
            console.log('Đăng nhập mã người dùng: ' + currentUser['user_id']);
            // console.log(results.rows.item(0)['power']);
            global.currentUser = currentUser;
            Keyboard.dismiss();
            navigation.replace('Home');
          } else {
            Alert.alert('Sai tài khoản hoặc mật khẩu');
          }
        },
        (tx, err) => {
          console.log(err);
        },
      );
    });
    // navigation.navigate('Home');
  }
  return (
    <SafeAreaView style={{height: '100%'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          flexDirection: 'column',
        }}>
        <View
          style={{
            width: global.dimensionWidth / 1.3,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 300,
          }}>
          <Image
            source={require('../image/signInImage.png')}
            style={{
              width: global.dimensionWidth / 1.3,
              resizeMode: 'contain',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <MyTextInput
            placeHolder="Tài khoản"
            onChangeText={(val) => {
              setTaikhoan(val);
            }}
          />
          <MyTextInput
            placeHolder="Mật khẩu"
            style={{marginBottom: 20}}
            onChangeText={(val) => {
              setMatkhau(val);
            }}
          />
          <MyButton
            title="Đăng nhập"
            style={{
              backgroundColor: Color.seaGreen,
              borderRadius: 50,
            }}
            onPress={dangNhap}
          />
          <MyButton
            title="Đăng kí"
            style={{
              backgroundColor: 'white',
              borderColor: 'lightgray',
              borderWidth: 0.5,
              borderRadius: 50,
            }}
            textStyle={{color: Color.jetGray}}
            onPress={() => {
              navigation.navigate('SignUp');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
export default SignInScreen;
