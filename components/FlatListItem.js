import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// export default class FlatListItem extends React.Component {
//   constructor(props) {
//     super(props);
//   }
// }

export default function FlatListItem({ item }) {
  return (
    <TouchableOpacity activeOpacity={.5}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'column' }} >
          <Text style={styles.address}>{item.dia_chi}</Text>
          <View style={{ flexDirection: 'row' }} >
            <View style={{ flex: 1 }} ><Text style={styles.caption} >{item.dien_tich}m2</Text></View>
            <View style={{ flex: 1 }} ><Text style={styles.caption} >{item.huong}</Text></View>
            <View style={{ flex: 2 }} ><Text style={styles.caption} >{item.gia_tham_dinh}/m2</Text></View>
          </View>
          <View>
            <Text style={styles.caption}>{item.ho_ten}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: 50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderColor: '#D0D0D0',
    marginBottom: 10,
  },
  address: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 11,
    color: 'gray',
  },
})