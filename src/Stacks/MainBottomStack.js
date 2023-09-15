import React, { lazy, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { setAppStart } from '../redux/features/Auth/authSlice';
import { setAppStartCart, useGetCartQuery } from '../redux/features/Cart/cartSlice';
import CartListSkeletonComponent from '../components/CartListSkeletonComponent';
import AccountSkeleton from '../components/AccountSkeleton';
import { StyleSheet, View } from 'react-native';
import Home from '../screens/Home';
import Cart from '../screens/Cart';
import Order from '../screens/Order';
import Account from '../screens/Account';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import { useGetSuggestionsQuery } from '../redux/features/Search/searchSlice';
// const Icon = lazy(() => import('react-native-vector-icons/FontAwesome'));
// const Icon1 = lazy(() => import('react-native-vector-icons/MaterialCommunityIcons'));

const Tab = createBottomTabNavigator();

const MainBottomStack = () => {
  
  const userId = useSelector((state) => state?.auth?.userData?.id);
  const cartData = useSelector((state) => state?.cart?.cart || []);
  const dispatch = useDispatch();
  const debouncedText = ""
  const {
    isSuccess,
    data,
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    error,
  } = useGetCartQuery({ param: userId }, { skip: userId ? false : true });
  const {data:data1} =
    useGetSuggestionsQuery(debouncedText);

  useEffect(() => {
    dispatch(setAppStart());
    dispatch(setAppStartCart());
  }, []);



  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
         
          tabBarLabelStyle: {
            marginBottom: 5 
          },
          headerTitleAlign:"center"
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                size={20}
                name={'home'}
                color={focused ? 'rgba(40, 116, 240, 1)' : 'black'} // Change color to rgba(40, 116, 240, 1) when focused, black when not focused
              />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                size={20}
                name={'user'}
                color={focused ? 'rgba(40, 116, 240, 1)' : 'black'} // Change color to rgba(40, 116, 240, 1) when focused, black when not focused
              />
            ),
          }}
        />
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{
            tabBarAccessibilityLabel: 'Cart',
            tabBarBadge:
              cartData.length > 0 ? cartData.length.toString() : null,
            tabBarIcon: ({ focused, color, size }) => (
              <Icon
                size={20}
                name={'shopping-cart'}
                color={focused ? 'rgba(40, 116, 240, 1)' : 'black'} // Change color to rgba(40, 116, 240, 1) when focused, black when not focused
              />
            ),
          }}
        />
        <Tab.Screen
          name="Order"
          component={Order}
          options={{
            title: 'Order',
            tabBarIcon: ({ focused, color, size }) => (
              <Icon1
                size={20}
                name={'clipboard-list'}
                color={focused ? 'rgba(40, 116, 240, 1)' : 'black'} // Change color to rgba(40, 116, 240, 1) when focused, black when not focused
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default MainBottomStack;
