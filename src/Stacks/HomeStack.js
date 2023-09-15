// App.js

import React, { lazy } from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainBottomStack from './MainBottomStack';
import { useSelector } from 'react-redux';
import { Button, Pressable, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import Cart from '../screens/Cart';

const Account = lazy(() => import('../screens/Account'));
const Login = lazy(() => import('../screens/Login'));
const Signup = lazy(() => import('../screens/Signup'));
const EditProfile = lazy(() => import('../screens/EditProfile'));
const AddressList = lazy(() => import('../screens/AddressList'));
const AddAddress = lazy(() => import('../screens/AddAddress'));
const SearchScreen = lazy(() => import('../screens/SearchScreen'));
const SearchResult = lazy(() => import('../screens/SearchResult'));
const CartBadge = lazy(() => import('../components/CartBadge'));


const Stack = createNativeStackNavigator();

const HomeStack = () => {
  const selectedCategory = useSelector(state => state?.search?.selectedCategory);
  const selectedText = useSelector(state => state?.search?.selectedText);
  const navigation = useNavigation()
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "..."; 
    }
    return text;
  }

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainBottomStack}
        options={{
          headerShown: false,
          title: 'Back',
          gestureEnabled: true,
        }}
      />
      <Stack.Screen name="Profile" component={Account} />
      <Stack.Screen name="Login" component={Login} options={{title: ''}} />
      <Stack.Screen name="Signup" component={Signup} options={{title: ''}} />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddressList"
        component={AddressList}
        options={{title: ''}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{title: ''}}
      />
      <Stack.Screen
        name="EditAddress"
        component={AddAddress}
        options={{title: ''}}
      />
      {/* <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/> */}
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{title: ''}}
      />
      <Stack.Screen
        name="SearchResult"
        component={SearchResult}
        options={{
          title: truncateText(selectedText || selectedCategory?.name || '', 20), // Truncate to 20 characters
          headerTitleAlign: 'center',
          headerBackTitle: 'Back',
          headerBackVisible: true,
          headerRight: () => {
            return <CartBadge />;
          },
         
          // headerLeft: () => (
          //   <Pressable  style={({ pressed }) => [
          //     { width: 70, height: 30, position: "absolute", right: 0 },
          //     pressed ? { opacity: 0.1,backgroundColor:"lightgray" } : {} // Change opacity when pressed
          //   ]} onPress={() => {
          //   if(selectedCategory?._id){
          //     navigation.goBack()
          //   }else{
          //     navigation.navigate("Search")
          //   }
          //     // Define your custom back button functionality here
          //     // For example, navigate back or execute some other action
          //     //navigation.dispatch(StackActions.popToTop()); // Navigate to the top of the stack
          //   }}>
              
          //   </Pressable>
          // ),
        }}
      />
      <Stack.Screen
        name="Cart"
        component={Cart}
        options={{title: '',headerBackTitle:"Back"}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
