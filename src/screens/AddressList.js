import React, {lazy, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Pressable,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useUpdateProfileMutation} from '../redux/features/Auth/authSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  setCurrentAddressSelected,
  triggerCheckout,
} from '../redux/features/Cart/cartSlice';
// import LoaderFull from '../components/LoaderFull';
// import Toast from '../components/Toast';
const LoaderFull = lazy(() => import('../components/LoaderFull'));
const Toast = lazy(() => import('../components/Toast'));
import {getErrorText} from '../utils/globalFunctions';

const AddressList = () => {
  const userData = useSelector(state => state?.auth?.userData);
  const paymentLoader = useSelector(state => state?.cart?.paymentLoader);
  const dispatch = useDispatch();
  const [addresses, setAddresses] = useState([]);
  const navigation = useNavigation();
  const [updateProfile, {isLoading, isError, error, isSuccess}] =
    useUpdateProfileMutation();
  const [selectedAddress, setSelectedAddress] = useState(null); // Store the selected address ID
  const route = useRoute();

  let showRadioButton = route?.params?.showRadioButton || false;

  //let successCallback = route?.params?.successCallback

  useEffect(() => {
    if (userData) {
      setAddresses(userData?.addresses || []);
    }
    setCurrentAddressSelected(null);
  }, [userData?.addresses]);

  const handleEditAddress = item => {
    navigation.navigate('EditAddress', {item});
  };

  const handleDeleteAddress = addressId => {
    updateProfile(
      JSON.stringify({
        addressToDeleteId: addressId,
      }),
    );
  };

  const handleAddressSelection = address => {
    setSelectedAddress(address);
    dispatch(setCurrentAddressSelected(address));
  };
  const renderItem = ({item}) => (
    <Pressable
      style={[
        styles.addressItem
      ]}
      testID="selectaddress" 
      onPress={() => handleAddressSelection(item)}>
      {showRadioButton ? (
        <View style={styles.radioContainer}>
          <View
            style={[
              styles.radio,
              {
                backgroundColor:
                  selectedAddress?.addressId === item?.addressId
                    ? 'white'
                    : 'transparent',
                borderColor:
                  selectedAddress?.addressId === item?.addressId
                    ? 'blue'
                    : 'lightgrey',
              },
            ]}
           >
            {selectedAddress?.addressId === item?.addressId && (
              <View style={styles.radioInner} />
            )}
          </View>
          <View style={{flex: 1}}>
            <View style={styles.addressHeader}>
              <Text style={styles.addressTitle}>{item?.addressName}</Text>
              <TouchableOpacity
              testID="editButton"
                style={styles.editButton}
                onPress={() => handleEditAddress(item)}>
                <Text>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.addressDetails}>
              {item?.address +
                ' ' +
                item?.locality +
                ' ' +
                item?.city +
                ' ' +
                item?.state +
                ' ' +
                item?.pincode}
            </Text>
          </View>
        </View>
      ) : (
        <View style={{flex: 1}}>
          <View style={styles.addressHeader}>
            <Text style={styles.addressTitle}>{item?.addressName}</Text>
            <TouchableOpacity
            testID="deleteButton"
              style={styles.editButton}
              onPress={() => handleEditAddress(item)}>
              <Text style={{color:"black"}}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.addressDetails}>
            {item?.address +
              ' ' +
              item?.locality +
              ' ' +
              item?.city +
              ' ' +
              item?.state +
              ' ' +
              item?.pincode}
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteAddress(item?.addressId)}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </Pressable>
  );

  const handleAddAddress = () => {
    navigation.navigate('AddAddress');
  };
  console.log('paymentLoader', error);
  return (
    // <View style={styles.container}>
    //   <Button title="Add Address" onPress={handleAddAddress} />
    //   <FlatList
    //     data={addresses}
    //     renderItem={renderItem}
    //     keyExtractor={item => item?.addressId.toString()}
    //   />
    // </View>
    <>
      <View style={styles.container}>
        {isLoading&&<LoaderFull/>}
        {paymentLoader && <LoaderFull />}
        {isError && (
          <Toast visible={true} message={getErrorText(error)} type={'error'} />
        )}
        {/* <Button title="Add Address" onPress={handleAddAddress} /> */}
        <TouchableOpacity
              style={styles.button}
              onPress={handleAddAddress}>
              <Text style={styles.buttonText}>
                {'Add a new Address'}
              </Text>
            </TouchableOpacity>
        <FlatList
          data={addresses}
          renderItem={renderItem}
          keyExtractor={item => item?.addressId.toString()}
        />

        {showRadioButton && (
          <TouchableOpacity
            style={[
              styles.checkoutButton,
              !selectedAddress?.addressId && styles.disabledCheckoutButton,
            ]}
            disabled={!selectedAddress?.addressId}
            onPress={() => {
              // successCallback?.(selectedAddress);
              dispatch(triggerCheckout(true));
            }}>
            <Text style={styles.checkoutButtonText}>Checkout</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  addressItem: {
    backgroundColor: '#ffffff',
    marginBottom: 16,
    borderRadius: 10,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  addressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  addressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  editButton: {
    fontSize: 14,
    color: '#007BFF',
  },
  addressDetails: {
    fontSize: 16,
    color: '#666',
  },
  deleteButton: {
    // backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 20, // Increased border radius for a circular appearance
    // width: 80, // Adjust the width as needed
    // height: 40, // Adjust the height as needed
  },
  deleteText: {
    color: 'red', // Text color
    fontWeight: 'bold',
  },
  selectButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007BFF',
  },
  selectText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
  selectedAddressItem: {
    backgroundColor: 'lightgray', // Define your desired background color for selected items
  },

  unselectedAddressItem: {
    backgroundColor: '#ffffff', // Define your desired background color for unselected items
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 8,
  },
  radio: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#007BFF',
  },
  radioLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabledCheckoutButton: {
    backgroundColor: 'lightgray',
  },
  button: {
   // backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default AddressList;
