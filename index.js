/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { SocketConnect } from './src/http/SocketHandle';
// Register the service socket
SocketConnect()
AppRegistry.registerComponent(appName, () => App);
