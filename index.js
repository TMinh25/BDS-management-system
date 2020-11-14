/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

global.currentUser = [];

AppRegistry.registerComponent(appName, () => App);
