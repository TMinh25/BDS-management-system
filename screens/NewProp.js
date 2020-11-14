import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Alert,
  SafeAreaView,
  Image,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MyTextInput from '../components/MyTextInput';
import MyButton from '../components/MyButton';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'BDSonline.db'});
function errorCB(err) {
  console.log('SQL Error: ' + err);
}

export default function NewProp({navigation}) {
  let [userID, setUserID] = useState(global.currentUser.user_id);
  let [diachi, setDiachi] = useState('');
  let [dientich, setDientich] = useState('');
  let [huong, setHuong] = useState('');
  let [giathamdinh, setGiathamdinh] = useState('');
  let [ghichu, setGhichu] = useState('');

  let checkValid = () => {
    userID || diachi || dientich || giathamdinh;
  };

  let registerNewProp = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO bds_tbl (user_id, dia_chi, dien_tich, huong, gia_tham_dinh, ghi_chu) VALUES ( ?, ?, ?, ?, ?, ?)',
        [userID, diachi, dientich, huong, giathamdinh, ghichu],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công',
              'Đăng tải thành công',
              [
                {
                  text: 'Đồng ý',
                  onPress: () => navigation.navigate('Home'),
                },
              ],
              {cancelable: false},
            );
            console.log('Người đăng: ' + userID);
            console.log(diachi, dientich, huong, giathamdinh, ghichu);
          } else alert('Lỗi');
        },
        (tx, err) => {
          errorCB(err);
        },
      );
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <Text>New Props</Text>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Text style={styles.pageTitle}>Thêm tài khoản</Text>
          <MyTextInput
            placeHolder="Địa chỉ"
            value={diachi}
            style={styles.textInput}
            onChangeText={(val) => {
              setDiachi(val);
            }}
          />
          <MyTextInput
            placeHolder="Diện tích"
            value={dientich}
            style={styles.textInput}
            onChangeText={(val) => {
              setDientich(val);
            }}
          />
          <MyTextInput
            placeHolder="Hướng"
            value={huong}
            style={styles.textInput}
            onChangeText={(val) => {
              setHuong(val);
            }}
          />
          <MyTextInput
            placeHolder="Giá thẩm định"
            value={giathamdinh}
            style={styles.textInput}
            onChangeText={(val) => {
              setGiathamdinh(val);
            }}
          />
          <MyTextInput
            placeHolder="Ghi chú"
            value={ghichu}
            onChangeText={(val) => setGhichu(val)}
            style={styles.textArea}
            multiline={true}
            numberOfLines={4}
          />
          <View style={{flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <MyButton
                title="Hủy"
                onPress={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <View style={{flex: 1}}>
              <MyButton
                title="Xác nhận"
                style={{backgroundColor: '#42f563'}}
                onPress={registerNewProp}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  pageTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
    textTransform: 'uppercase',
  },
  textInput: {
    padding: 10,
    fontSize: 18,
  },
  textArea: {
    padding: 10,
    fontSize: 18,
    minHeight: 100,
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  avatar: {
    width: 200,
    height: 200,
    margin: 10,
    borderColor: '#909090',
    borderWidth: 3,
  },
});
