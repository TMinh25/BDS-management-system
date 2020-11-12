import React, { useEffect } from 'react';
import { } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

// IMPORT SCREENS
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import MainTabScreen from './screens/MainTabScreen';

db = SQLite.openDatabase({ name: 'BDSonline.db' });
if (!db) {
  console.log('Could not connect to database!');
} else {
  console.log('Database connected!');
}

const Stack = createStackNavigator();

function App() {
  React.useEffect(() => {
    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='bds_tbl'",
        [],
        function (tx, results) {
          if (results.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS bds_tbl', []);
            tx.executeSql(
              'CREATE TABLE bds_tbl (bds_id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, dia_chi TEXT, dien_tich REAL, huong TEXT, gia_tham_dinh REAL, ghi_chu TEXT)',
              [],
            );
            console.log('created table: bds_tbl!');
          } else {
            console.log('table exists: bds_tbl!');
          }
        },
      );
    });

    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='user_tbl'",
        [],
        function (tx, results) {
          if (results.rows.length == 0) {
            tx.executeSql('DROP TABLE IF EXISTS user_tbl', []);
            tx.executeSql(
              'CREATE TABLE user_tbl (user_id INTEGER PRIMARY KEY AUTOINCREMENT, tai_khoan TEXT, mat_khau TEXT, power INTEGER, ho_ten TEXT, gioi_tinh TEXT, tuoi INTEGER, avatar TEXT, ghi_chu TEXT )',
              [],
            );
            console.log('created table: user_tbl!');
          } else {
            console.log('table exists: user_tbl!');
          }
        },
      );
    });

    db.transaction(function (tx) {
      tx.executeSql(
        "SELECT * FROM user_tbl",
        [],
        function (tx, results) {
          console.log(results.rows.length);
          // for (let i = 0; i < results.rows.length; i++) {
          //   console.log(results.rows[i]['tai_khoan']);
          //   console.log(results.rows[i]['mat_khau']);
          // }
        },
      );
    });
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
        />
        <Stack.Screen
          name="Home"
          component={MainTabScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
