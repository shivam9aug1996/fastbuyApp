import React, {lazy, useEffect} from 'react';
import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {authApi, useLogoutMutation} from '../redux/features/Auth/authSlice';
import {cartApi, resetCartSlice} from '../redux/features/Cart/cartSlice';
import {orderApi} from '../redux/features/Order/orderSlice';
import {useIsFocused, useNavigation} from '@react-navigation/native';
// import Toast from '../components/Toast';
const Toast = lazy(() => import('../components/Toast'));

import {getErrorText} from '../utils/globalFunctions';
// import LoaderFull from '../components/LoaderFull';
const LoaderFull = lazy(() => import('../components/LoaderFull'));
const Account = () => {
  const reduxToken = useSelector(state => state?.auth?.token);
  const reduxUserData = useSelector(state => state?.auth?.userData);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [logout, {isSuccess, isLoading, isError, error}] = useLogoutMutation();

  const isAuthenticated =
    reduxToken !== undefined && reduxToken !== '' ? true : false;

  useEffect(() => {
    if (isSuccess) {
      dispatch(cartApi.util.resetApiState());
      dispatch(orderApi.util.resetApiState());
      dispatch(resetCartSlice());
      dispatch(authApi.util.resetApiState());
      navigation.reset({
        index: 0,
        routes: [{name: 'Home'}],
      });
    }
  }, [isSuccess, dispatch]);
  // let arr=[]
  // for(let i=0;i<10000000;i++){
  //   arr[i]=1
  // }

  return (
    <View style={styles.container}>
      {isError && (
        <Toast visible={true} message={getErrorText(error)} type={'error'} />
      )}
      {isLoading && <LoaderFull />}
      {isAuthenticated ? (
        <View style={styles.authContainer}>
          <Text
            style={styles.userName}>{`Welcome, ${reduxUserData?.name}`}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('EditProfile')}>
            <Text style={styles.buttonText}>{'Profile Information'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddressList')}>
            <Text style={styles.buttonText}>{'Manage Addresses'}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => logout()}>
            <Text style={styles.buttonText}>{'Logout'}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.authContainer}>
          {/* <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
            style={styles.button}
          /> */}

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>{'Login'}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.buttonText}>{'Signup'}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '80%',
   // height: 300,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // button: {
  //   marginBottom: 10,
  //   backgroundColor: '#007BFF',
  //  // marginBottom:30,

  // },
  logoutButton: {
    marginBottom: 10,
    backgroundColor: 'red',
    
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom:10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
