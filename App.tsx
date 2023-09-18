// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomeStack from './src/Stacks/HomeStack';
import {StatusBar} from 'react-native';
import VoiceTest from './src/components/Voice';

function App() {
  StatusBar.setBarStyle('dark-content');

  return (
    <Provider store={store}>
      <NavigationContainer>
        <HomeStack />
        <VoiceTest />
      </NavigationContainer>
    </Provider>
  );
}

export default App;
