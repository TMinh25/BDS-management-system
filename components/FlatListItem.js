import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function FlatListItem({backgroundColor, item}) {
  return (
    <TouchableOpacity activeOpacity={0.5}>
      {/* <View style={styles.container}> */}
      <View style={[styles.container, {backgroundColor: backgroundColor}]}>
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

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    // borderColor: '#D0D0D0',
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
