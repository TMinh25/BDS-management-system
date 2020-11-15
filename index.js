/**
 * @format
 */

import {AppRegistry, Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.currentUser = [];
global.dimensionWidth = Dimensions.get('window').width;
global.dimensionHeight = Dimensions.get('window').height;

global.colorTheme = {
  seaGreen: '#00C4B2',
  davyGrey: '#565656',
  redOrange: '#FF4A1C',
};

AppRegistry.registerComponent(appName, () => App);
