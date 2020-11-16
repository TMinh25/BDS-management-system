import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

class MyTextInput extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.textInputContainer}>
        <TextInput
          style={[styles.textInput, this.props.style]}
          underlineColorAndroid="transparent"
          placeholder={this.props.placeHolder}
          placeholderTextColor="gray"
          keyboardType={this.props.keyboardType}
          onChangeText={this.props.onChangeText}
          returnKeyType={this.props.returnKeyType}
          numberOfLines={this.props.numberOfLines}
          multiline={this.props.multiline}
          onSubmitEditing={this.props.onSubmitEditing}
          blurOnSubmit={false}
          value={this.props.value}
        />
      </View>
    );
  }
}
export default MyTextInput;

const styles = StyleSheet.create({
  textInputContainer: {
    paddingHorizontal: 20,
    marginTop: 15,
  },
  textInput: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 13,
    backgroundColor: 'white',
  },
});
