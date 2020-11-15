import React from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';

import MyButton from '../components/MyButton';

function SettingScreen({navigation}) {
  return (
    <SafeAreaView>
      <View>
        <MyButton
          title="Đăng xuất"
          style={{backgroundColor: '#FD586B'}}
          onPress={() => {
            // hỏi người dùng muốn logout hay không
            Alert.alert(
              'Đăng xuất?',
              'Đừng bỏ tớ mà. Bạn thật sự muốn đi sao?',
              [
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
              ],
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
}
export default SettingScreen;
