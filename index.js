/**
 * @format
 */

import {AppRegistry, Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.currentUser = [];
global.dimensionWidth = Dimensions.get('window').width;
global.dimensionHeight = Dimensions.get('window').height;


AppRegistry.registerComponent(appName, () => App);
