import React from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

class MyButton extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<View style={{ paddingHorizontal: 20 }} >
				<TouchableOpacity
					style={(styles.button)}
					onPress={this.props.onPress}
					activeOpacity={0.5}
				>
					<View style={styles.buttonContainer}>
						{this.props.title && <Text style={styles.text}>{this.props.title}</Text>}
					</View>
				</TouchableOpacity>
			</View>
		);
	}
}
export default MyButton;

const styles = StyleSheet.create({
	buttonContainer: {
		paddingHorizontal: 10,
		marginTop: 20,
		width: '100%',
		backgroundColor: '#486DD2',
		borderRadius: 5,
	},
	button: {
		borderRadius: 10,
	},
	text: {
		color: '#ffffff',
		fontSize: 20,
		fontWeight: 'bold',
		minHeight: 50,
		paddingTop: 10,
		textAlign: 'center'
	},
})