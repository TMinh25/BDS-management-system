import React from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

// IMPORT COMPONENTS
import MyButton from '../components/MyButton';
import {Color} from '../components/Color';

// IMPORT SCREENS
import UserSettingScreen from './UserSettingScreen';

function SignOutFunction({navigation}) {
  return (
    <View>
      <MyButton
        title="Đăng xuất"
        style={{backgroundColor: '#FD586B'}}
        onPress={() => {
          // hỏi người dùng muốn logout hay không
          Alert.alert('Đăng xuất?', 'Đừng bỏ tớ mà. Bạn thật sự muốn đi sao?', [
            {
              text: 'Không đi nữa',
              style: 'cancel',
              onPress: () => {},
            },
            {
              text: 'Đi luôn',
              style: 'logout',
              onPress: () => navigation.navigate('SignIn'),
              // Nếu người dùng chấp thuận, cho ra ngoài màn hình signin
            },
          ]);
        }}
      />
    </View>
  );
}
function UserManageFunction({navigation}) {
  return (
    <View>
      <MyButton
        title="Quản lý người dùng"
        style={{backgroundColor: Color.seaGreen}}
        onPress={() => navigation.navigate('UserSetting')}
      />
    </View>
  );
}

function SettingFunction({navigation}) {
  if (global.currentUser.power == 0) {
    return (
      <View>
        <UserManageFunction navigation={navigation} />
        <SignOutFunction navigation={navigation} />
      </View>
    );
  } else {
    return (
      <View>
        <SignOutFunction navigation={navigation} />
      </View>
    );
  }
}

function SettingScreen({navigation}) {
  return (
    <SafeAreaView>
      <SettingFunction navigation={navigation} />
    </SafeAreaView>
  );
}

const SettingStack = createStackNavigator();

const SettingStackScreen = ({navigation}) => (
  <SettingStack.Navigator screenOptions={{headerShown: false}}>
    <SettingStack.Screen name="Setting" component={SettingScreen} />
    <SettingStack.Screen name="UserSetting" component={UserSettingScreen} />
  </SettingStack.Navigator>
);

export default SettingStackScreen;
