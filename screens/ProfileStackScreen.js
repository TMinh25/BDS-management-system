import React, {useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import Header from '@react-navigation/stack';
import {createStackNavigator} from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-picker';

// IMPORT COMPONENTS
import {Color} from '../components/Color';
import MyButton from '../components/MyButton';
import MyTextInput from '../components/MyTextInput';

// IMPORT SCREENS
import SignInScreen from './SignInScreen';
import {ScrollView} from 'react-native-gesture-handler';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

function ProfileScreen() {
  let [id, setID] = useState(global.currentUser.user_id);
  let [hoten, setHoten] = useState(global.currentUser.ho_ten);
  let [sdt, setSdt] = useState(global.currentUser.sdt);
  let [gioitinh, setGioitinh] = useState(global.currentUser.gioi_tinh);
  let [tuoi, setTuoi] = useState(global.currentUser.tuoi);
  let [avatar, setAvatar] = useState(global.currentUser.avatar);
  let [ghichu, setGhichu] = useState(global.currentUser.ghi_chu);

  let [editable, setEditable] = useState(false);

  let chooseImage = () => {
    setEditable(!editable);
    var options = {
      title: 'Chỉnh ảnh đại diện nào',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        // console.log('Đã huỷ bỏ chọn ảnh');
        setEditable(false);
        console.log('Hủy chỉnh sửa ảnh đại điện');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        let source = response;
        setAvatar('data:image/;base64,' + source.data);
      }
    });
  };

  let updateUser = () => {
    // console.log(fullname, dob, sex, classId, description);
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE user_tbl SET ho_ten=?, sdt=?, gioi_tinh=?, tuoi=?, avatar=?, ghi_chu=? WHERE user_id=?',
        [hoten, sdt, gioitinh, tuoi, avatar, ghichu, id],
        (tx, results) => {
          console.log('Executed query');
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Thành công rồi',
              'Bạn đã hóa trang thành người khác xD',
              [
                {
                  text: 'Ok',
                  onPress: () => setEditable(!editable),
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
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.flexGrowOne}>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={chooseImage}
        style={{
          flex: 1.2,
          elevation: 10,
        }}>
        <View style={{flex: 1}}>
          <Image
            source={
              avatar !== ''
                ? {uri: avatar}
                : require('../image/avatarUnset.png')
            }
            style={{
              width: global.dimensionWidth,
              height: '100%',
              resizeMode: 'cover',
              borderBottomLeftRadius: 100 / 2,
              borderBottomRightRadius: 100 / 2,
            }}
          />
        </View>
      </TouchableOpacity>
      <ScrollView bounces={false} style={styles.flexOne}>
        <View
          style={styles.textInputWrapper}
          pointerEvents={editable ? 'auto' : 'none'}>
          <MyTextInput
            style={styles.textInput}
            value={hoten}
            placeholder="Họ tên"
            onChangeText={(val) => {
              setHoten(val);
            }}
          />
          <MyTextInput
            style={styles.textInput}
            placeholder="Số điện thoại"
            value={sdt.toString()}
            keyboardType="numeric"
            onChangeText={(val) => {
              setSdt(val);
            }}
          />
          <MyTextInput
            style={styles.textInput}
            placeholder="Tuổi"
            value={tuoi.toString()}
            keyboardType="numeric"
            onChangeText={(val) => {
              setTuoi(val);
            }}
          />
          <MyTextInput
            style={styles.textInput}
            placeholder="Giới tính"
            value={gioitinh}
            onChangeText={(val) => {
              setGioitinh(val);
            }}
          />
          <MyTextInput
            style={styles.textInput}
            value={ghichu}
            placeholder="Tiểu sử"
            onChangeText={(val) => {
              setGhichu(val);
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonBackgroundColor}>
        {!editable && (
          <MyButton
            title="Chỉnh sửa"
            onPress={() => {
              setEditable(!editable);
              Keyboard.dismiss();
            }}
          />
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
                  updateUser();
                }}
              />
            </View>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="Hồ sơ" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

export default ProfileStackScreen;

const styles = StyleSheet.create({
  flexGrowOne: {
    flexGrow: 1,
  },
  flexOne: {
    flex: 1,
  },
  textInputWrapper: {
    flex: 1,
    // height: 40,
    margin: 20,
  },
  textInput: {
    padding: 9,
    color: Color.davyGray,
  },
  // buttonWrapper: {
  //   backgroundColor: '#51D8C7',
  //   borderWidth: 0,
  //   color: '#FFFFFF',
  //   borderColor: '#000',
  //   height: 40,
  //   alignItems: 'center',
  //   borderRadius: 5,
  // },
  buttonBackgroundColor: {
    backgroundColor: '#e6fff9',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
