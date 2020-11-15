import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import SignInScreen from './SignInScreen';

function ProfileScreen() {
  return (
    <SafeAreaView style={{alignItems: 'center', justifyContent: 'center'}}>
      {/* <Text>Profile!</Text> */}
      <View style={{width: global.dimensionWidth, height: '100%'}}>
        <View style={{flex: 1.2}}>
          <View
            style={{
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 1,
              shadowRadius: 16.0,

              elevation: 24,
            }}>
            <Image
              source={
                global.currentUser.avatar !== ''
                  ? {uri: global.currentUser.avatar}
                  : require('../image/avatarUnset.png')
              }
              style={{
                width: global.dimensionWidth,
                height: '100%',
                resizeMode: 'cover',
                // borderRadius: 200 / 2,
                borderBottomLeftRadius: 100 / 2,
                borderBottomRightRadius: 100 / 2,
              }}
            />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={styles.centeredText}>{global.currentUser.ho_ten}</Text>
          <Text style={styles.centeredText}>{global.currentUser.sdt}</Text>
          <Text style={styles.centeredText}>{global.currentUser.tuoi}</Text>
          <Text style={styles.centeredText}>
            {global.currentUser.gioi_tinh}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 20,
              width: '100%',
            }}></View>
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
  centeredText: {
    textAlign: 'center',
  },
});
