import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  Keyboard,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-picker';

// IMPORT COMPONENTS
import {Color} from '../components/Color';
import MyButton from '../components/MyButton';

// IMPORT SCREENS
import SignInScreen from './SignInScreen';

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
    var options = {
      title: 'Chỉnh ảnh đại diện nào',
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
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>Profile!</Text> */}
      <View style={{width: global.dimensionWidth, height: '100%'}}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={chooseImage}
          style={{
            flex: 1.2,
          }}>
          <View>
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
        <View style={{flex: 1}}>
          <View pointerEvents={editable ? 'auto' : 'none'}>
            <TextInput
              style={styles.centeredTextInput}
              value={hoten}
              placeholder="Họ tên"
              onChangeText={(val) => {
                setHoten(val);
              }}
            />
            <TextInput
              style={styles.centeredTextInput}
              placeholder="Số điện thoại"
              value={sdt.toString()}
              keyboardType="numeric"
              onChangeText={(val) => {
                setSdt(val);
              }}
            />
            <TextInput
              style={styles.centeredTextInput}
              placeholder="Tuổi"
              value={tuoi.toString()}
              keyboardType="numeric"
              onChangeText={(val) => {
                setTuoi(val);
              }}
            />
            <TextInput
              style={styles.centeredTextInput}
              placeholder="Giới tính"
              value={gioitinh}
              onChangeText={(val) => {
                setGioitinh(val);
              }}
            />
            <TextInput
              style={styles.centeredTextInput}
              value={ghichu}
              placeholder="Tiểu sử"
              onChangeText={(val) => {
                setGhichu(val);
              }}
            />
          </View>
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
      </View>
    </SafeAreaView>
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
  container: {
    marginHorizontal: 16,
  },
  Item_avatar: {
    marginRight: 5,
    paddingHorizontal: 5,
  },
  header: {
    fontSize: 32,
  },
  title: {
    fontSize: 24,
  },
  centeredTextInput: {
    textAlign: 'center',
    // width: global.dimenstionWidth / 2,
    color: Color.davyGray,
  },
});
