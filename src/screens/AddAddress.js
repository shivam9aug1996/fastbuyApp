import React, {lazy, useEffect, useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useUpdateProfileMutation} from '../redux/features/Auth/authSlice';
import {useNavigation, useRoute} from '@react-navigation/native';
// import LoaderFull from '../components/LoaderFull';
// import Toast from '../components/Toast';
const LoaderFull = lazy(() => import('../components/LoaderFull'));
const Toast = lazy(() => import('../components/Toast'));
import {getErrorText} from '../utils/globalFunctions';
import FormWrapper from '../components/FormWrapper';

const AddAddress = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [formData, setFormData] = useState({
    pincode: '',
    locality: '',
    address: '',
    city: '',
    state: '',
    landmark: '',
  });
  const [updateProfile, {isLoading, isError, error, isSuccess}] =
    useUpdateProfileMutation();
  const [formErrors, setFormErrors] = useState({
    pincode: false,
    locality: false,
    address: false,
    city: false,
    state: false,
  });

  console.log('87rdfghjk', route?.params?.item);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  useEffect(() => {
    if (route?.params?.item) {
      let {
        pincode,
        locality,
        address,
        city,
        state,
        landmark = '',
      } = route?.params?.item;
      setFormData({
        pincode: pincode.toString(),
        locality,
        address,
        city,
        state,
        landmark,
      });
    }
  }, [route?.params?.item]);

  const validateForm = () => {
    const errors = {};
    // for (const field in formData) {
    //   if (formData[field].trim() === '' && field !== 'landmark') {
    //     errors[field] = true;
    //   }
    // }
    if (formData.pincode.trim() === '') {
      errors.pincode = true;
    } else if (formData.locality.trim() == '') {
      errors.locality = true;
    } else if (formData.address.trim() == '') {
      errors.address = true;
    } else if (formData.city.trim() == '') {
      errors.city = true;
    } else if (formData.state.trim() == '') {
      errors.state = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddAddress = () => {
    if (validateForm()) {
      updateProfile(
        JSON.stringify({
          newAddress: {
            pincode: formData.pincode.trim(),
            locality: formData.locality.trim(),
            address: formData.address.trim(),
            city: formData.city.trim(),
            state: formData.state.trim(),
            landmark: formData.landmark.trim() || '',
          },
        }),
      );
    }
  };

  const handleChangeText = (fieldName, text) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
    setFormErrors({...formErrors, [fieldName]: false});
  };

  const handleEditAddress = () => {
    if (validateForm()) {
      updateProfile(
        JSON.stringify({
          modifiedAddresses: {
            pincode: formData.pincode,
            locality: formData.locality,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            landmark: formData.landmark || '',
            addressId: route?.params?.item?.addressId,
          },
        }),
      );
    }
  };

  return (
    <>
      {isLoading && <LoaderFull />}
      {isError && (
        <Toast visible={true} message={getErrorText(error)} type={'error'} />
      )}
      <FormWrapper>
        <>
          <Text style={styles.title}>
            {route?.params?.item ? 'Edit Address' : 'Add New Address'}
          </Text>

          {/* Pincode */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={[styles.input, formErrors.pincode && styles.error]}
              placeholder="Pincode"
              value={formData.pincode}
              onChangeText={text => handleChangeText('pincode', text)}
              maxLength={10}
              placeholderTextColor={"gray"}
            />
          </View>

          {/* Locality */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Locality</Text>
            <TextInput
              style={[styles.input, formErrors.locality && styles.error]}
              placeholder="Locality"
              value={formData.locality}
              onChangeText={text => handleChangeText('locality', text)}
              maxLength={30}
              placeholderTextColor={"gray"}
            />
          </View>

          {/* Address */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, formErrors.address && styles.error]}
              placeholder="Address"
              value={formData.address}
              onChangeText={text => handleChangeText('address', text)}
              maxLength={50}
              placeholderTextColor={"gray"}
            />
          </View>

          {/* City */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>City</Text>
            <TextInput
              style={[styles.input, formErrors.city && styles.error]}
              placeholder="City"
              value={formData.city}
              onChangeText={text => handleChangeText('city', text)}
              maxLength={30}
              placeholderTextColor={"gray"}
            />
          </View>

          {/* State */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={[styles.input, formErrors.state && styles.error]}
              placeholder="State"
              value={formData.state}
              onChangeText={text => handleChangeText('state', text)}
              maxLength={30}
              placeholderTextColor={"gray"}
            />
          </View>

          {/* Landmark */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Landmark</Text>
            <TextInput
              style={styles.input}
              placeholder="Landmark"
              value={formData.landmark}
              onChangeText={text => handleChangeText('landmark', text)}
              maxLength={30}
              placeholderTextColor={"gray"}
            />
          </View>

          {formErrors.pincode && (
            <Text style={styles.errorText}>Pincode is required.</Text>
          )}
          {formErrors.locality && (
            <Text style={styles.errorText}>Locality is required.</Text>
          )}
          {formErrors.address && (
            <Text style={styles.errorText}>Address is required.</Text>
          )}
          {formErrors.city && (
            <Text style={styles.errorText}>City is required.</Text>
          )}
          {formErrors.state && (
            <Text style={styles.errorText}>State is required.</Text>
          )}

          <View style={styles.buttonContainer}>
            {/* <Button
            title={route?.params?.item ? 'Save Address' : 'Add Address'}
            onPress={() => {
              if (route?.params?.item) {
                handleEditAddress();
              } else {
                handleAddAddress();
              }
            }}
            //color="#fff" // Text color
          /> */}
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (route?.params?.item) {
                  handleEditAddress();
                } else {
                  handleAddAddress();
                }
              }}>
              <Text style={styles.buttonText}>
                {'Save Address'}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      </FormWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    color: 'black',
  },
  error: {
    borderColor: 'red', // Change the border color for error fields
  },
  // buttonContainer: {
  //   backgroundColor: '#007BFF', // Button background color
  //   borderRadius: 5,
  //   padding: 5,
  // },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddAddress;
