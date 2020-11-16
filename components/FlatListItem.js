import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Color} from './Color';

function FlatListItemProp({backgroundColor, item}) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      {/* <View style={styles.container}> */}
      <View style={[styles.containerProp, {backgroundColor: backgroundColor}]}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.address}>{item['dia_chi']}</Text>
          <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
            <View style={{flex: 1}}>
              <Text style={styles.caption}>
                Diện tích: {item['dien_tich']}m2
              </Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.caption}>Hướng: {item['huong']}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.caption}>
                Giá: {item['gia_tham_dinh']}đ/m2
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
            <View style={{flex: 3}}>
              <Text style={styles.caption}>{item['ho_ten']}</Text>
            </View>
            <View style={{flex: 2}}>
              <Text style={styles.caption}>Liên hệ: {item['sdt']}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
function FlatListItemUser({backgroundColor, item}) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      {/* <View style={styles.container}> */}
      <View style={[styles.containerUser, {backgroundColor: backgroundColor}]}>
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.address}>{item['ho_ten']}</Text>
          <View style={{flexDirection: 'row', flex: 1, width: '100%'}}>
            <View style={{flex: 1}}>
              <Text style={styles.caption}>SĐT: {item['sdt']}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.caption}>Giới tính: {item['gioi_tinh']}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.caption}>Tuổi: {item['tuoi']}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export {FlatListItemProp, FlatListItemUser};

const styles = StyleSheet.create({
  containerProp: {
    // borderWidth: 2,
    // borderColor: '#D0D0D0',
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  containerUser: {
    borderWidth: 2,
    borderColor: Color.davyGray,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 11,
    color: 'black',
  },
});
