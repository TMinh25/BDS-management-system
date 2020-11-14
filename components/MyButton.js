import React from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

class MyButton extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, this.props.style]}
          onPress={this.props.onPress}
          activeOpacity={0.5}>
          <View>
            {this.props.title && (
              <Text style={styles.text}>{this.props.title}</Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
export default MyButton;

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    borderRadius: 10,
    backgroundColor: '#486DD2',
    width: '100%',
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    minHeight: 50,
    paddingTop: 10,
    textAlign: 'center',
  },
});
