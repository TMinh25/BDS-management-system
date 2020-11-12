import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

class MyTextInput extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={styles.textInputContainer}>
				<TextInput style={styles.textInput}
					underlineColorAndroid="transparent"
					placeholder={this.props.placeHolder}
					placeholderTextColor="gray"
					keyboardType={this.props.keyboardType}
					onChangeText={this.props.onChangeText}
					returnKeyType={this.props.returnKeyType}
					numberOfLines={this.props.numberOfLines}
					multiline={this.props.multiline}
					onSubmitEditing={this.props.onSubmitEditing}
					// style={this.props.style}
					blurOnSubmit={false}
					value={this.props.value} />
			</View>
		);
	}
}
export default MyTextInput;

const styles = StyleSheet.create({
	textInputContainer: {
		paddingHorizontal: 20, marginTop: 20,
	},
	textInput: {
		borderColor: '#161616',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10,
	},
})