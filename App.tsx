// In App.js in a new project

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import HomeStack from './src/Stacks/HomeStack';
import { StatusBar } from 'react-native';


function App() {
 
  StatusBar.setBarStyle("dark-content"); // Optionally, set the text color

  return (
    <Provider store={store}>
     
      <NavigationContainer>
        <HomeStack/>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
