/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';

import {Provider} from 'react-redux';
import InspectionElementScreen from './src/screens/InspectionElement/InspectionElementScreen';

import configureStore from './src/store/store';

const store = configureStore();

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <InspectionElementScreen />
      </Provider>
    );
  }
}
