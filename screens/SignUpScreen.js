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
import ImagePicker from 'react-native-image-picker';

var db = openDatabase({name: 'BDSonline.db'});
function errorCB(err) {
  console.log('SQL Error: ' + JSON.stringify(err));
}
const SignUpScreen = ({navigation}) => {
  let [taikhoan, setTaikhoan] = useState('');
  let [matkhau, setMatkhau] = useState('');
  let [hoten, setHoten] = useState('');
  let [sdt, setSdt] = useState('');
  let [gioitinh, setGioitinh] = useState('');
  let [tuoi, setTuoi] = useState('');
  let [avatar, setAvatar] = useState('');
  let [ghichu, setGhichu] = useState('');

  let chooseImage = () => {
    var options = {
      title: 'Chọn ảnh',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Đã huỷ bỏ chọn ảnh');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        setAvatar('data:image/;base64,' + source.data);
      }
    });
  };

  let isFinishingForm = () => {
    return taikhoan || matkhau || hoten || gioitinh || tuoi || avatar;
  };

  let signUpNewAccount = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO user_tbl (tai_khoan, mat_khau, power, ho_ten, sdt, gioi_tinh, tuoi, avatar, ghi_chu) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [taikhoan, matkhau, 1, hoten, sdt, gioitinh, tuoi, avatar, ghichu],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công rồi!',
              'Bạn có thể khám phá rồi đó',
              [
                {
                  text: 'OK',
                  onPress: () => navigation.navigate('SignIn'),
                },
              ],
              {cancelable: false},
            );
            console.log('Tài khoản: ' + taikhoan + ', Mật khẩu: ' + matkhau);
            console.log(taikhoan, matkhau, hoten, gioitinh, tuoi, ghichu);
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
        <View style={{flex: 1, backgroundColor: 'white', paddingBottom: 20}}>
          <Text style={styles.pageTitle}>Thêm tài khoản</Text>
          <MyTextInput
            placeHolder="Tài khoản"
            value={taikhoan}
            style={styles.textInput}
            onChangeText={(val) => {
              setTaikhoan(val);
            }}
          />
          <MyTextInput
            placeHolder="Mật khẩu"
            value={matkhau}
            style={styles.textInput}
            onChangeText={(val) => {
              setMatkhau(val);
            }}
          />
          <MyTextInput
            placeHolder="Họ tên"
            value={hoten}
            style={styles.textInput}
            onChangeText={(val) => {
              setHoten(val);
            }}
          />
          <MyTextInput
            placeHolder="Số điện thoại"
            value={sdt}
            style={styles.textInput}
            onChangeText={(val) => {
              setSdt(val);
            }}
          />
          <MyTextInput
            placeHolder="Giới tính"
            value={gioitinh}
            style={styles.textInput}
            onChangeText={(val) => {
              setGioitinh(val);
            }}
          />
          <MyTextInput
            placeHolder="Tuổi"
            value={tuoi}
            style={styles.textInput}
            keyboardType="numeric"
            onChangeText={(val) => {
              setTuoi(val);
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
            <View style={{flex: 1}}></View>
            <View style={{flex: 4, alignItems: 'center'}}>
              <TouchableWithoutFeedback
                style={styles.avatar}
                onPress={chooseImage}>
                <View>
                  <Image
                    source={
                      avatar !== ''
                        ? {uri: avatar}
                        : require('../image/chooseImage.png')
                    }
                    style={styles.avatar}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={{flex: 1}}></View>
          </View>
          <View style={{flexDirection: 'column'}}>
            <View style={{flex: 1}}>
              <MyButton title="Đăng kí nào!" onPress={signUpNewAccount} />
            </View>
            <View style={{flex: 1}}>
              <MyButton
                title="Có tài khoản rồi, quay lại thôi!"
                style={styles.button}
                onPress={() => {
                  if (isFinishingForm()) {
                    Alert.alert(
                      'Bạn đang làm dở mà',
                      'Bạn thật sự muốn quay lại chứ',
                      [
                        {
                          text: 'Hủy',
                          onPress: () => {},
                        },
                        {
                          text: 'Có',
                          onPress: () => navigation.goBack(),
                        },
                      ],
                    );
                  } else {
                    navigation.goBack();
                  }
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUpScreen;

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
  button: {
    backgroundColor: 'red',
  },
});
