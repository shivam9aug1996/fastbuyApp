import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Account from '../screens/Account';
import Signup from '../screens/Signup';
import EditProfile from '../screens/EditProfile';
import AddressList from '../screens/AddressList';
import AddAddress from '../screens/AddAddress';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if (!isFocused) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
    }
  }, [isFocused]);

  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen name="Profile" component={Account} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="AddressList" component={AddressList} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen name="EditAddress" component={AddAddress} />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
