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
  KeyboardAvoidingView,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import SQLite from 'react-native-sqlite-storage';
import ImagePicker from 'react-native-image-picker';

// IMPORT COMPONENTS
import {Color} from '../components/Color';
import MyButton from '../components/MyButton';

// IMPORT SCREENS
import {ScrollView} from 'react-native-gesture-handler';
import MyTextInput from '../components/MyTextInput';

const db = SQLite.openDatabase({name: 'BDSonline.db'});

function PropDetail({navigation, ID}) {
  const id = ID;
  const [prop, setProp] = useState([]);
  let [diachi, setDiachi] = useState('');
  let [dientich, setDientich] = useState('');
  let [huong, setHuong] = useState('');
  let [giathamdinh, setGiathamdinh] = useState('');
  let [ghichu, setGhichu] = useState('');
  let [nguoiban, setNguoiban] = useState('');
  let [sdt, setSdt] = useState('');

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
  }, [prop['bds_id']]);

  function loadData() {
    console.log('id: ' + id);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT user_tbl.ho_ten, user_tbl.sdt, bds_tbl.* FROM bds_tbl JOIN user_tbl WHERE bds_tbl.user_id = user_tbl.user_id AND bds_id=?',
        [id],
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
        [id],
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
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={styles.flexGrowOne}>
      <ScrollView bounces={false} style={styles.flexOne}>
        <View style={styles.textInputWrapper} pointerEvents="none">
          <MyTextInput style={styles.textInput} value={diachi} />
          <MyTextInput style={styles.textInput} value={dientich.toString()} />
          <MyTextInput style={styles.textInput} value={huong} />
          <MyTextInput
            style={styles.textInput}
            value={giathamdinh.toString()}
          />
          <MyTextInput style={styles.textInput} value={ghichu} />
          <MyTextInput style={styles.textInput} value={nguoiban} />
          <MyTextInput style={styles.textInput} value={sdt} />
        </View>
      </ScrollView>
      {global.currentUser.power && (
        <View style={{flex: 1}}>
          <MyButton
            title="Xóa"
            style={{backgroundColor: Color.seaGreen}}
            onPress={() => {
              deleteProp();
            }}
          />
        </View>
      )}
    </KeyboardAvoidingView>
  );
}

const ProfileStack = createStackNavigator();

const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="Hồ sơ" component={PropDetail} />
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
    borderWidth: 0,
  },
  buttonBackgroundColor: {
    backgroundColor: '#e6fff9',
    paddingHorizontal: 10,
    paddingBottom: 20,
    paddingTop: 10,
  },
});
