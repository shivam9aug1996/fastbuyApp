// App.js

import React from 'react';

import SearchScreen from '../screens/SearchScreen';
import Home from '../screens/Home';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import ResultsScreen from './ResultsScreen';

const Stack = createNativeStackNavigator();

const SearchStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Search" component={SearchScreen} options={{headerShown:false}}/>
      {/* <Stack.Screen name="Results" component={ResultsScreen} /> */}
    </Stack.Navigator>
  );
};

export default SearchStack;
