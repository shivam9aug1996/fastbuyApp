import {Button, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {lazy, useEffect, useState} from 'react';
import {useUpdateProfileMutation} from '../redux/features/Auth/authSlice';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
// import LoaderFull from '../components/LoaderFull';
import {getErrorText} from '../utils/globalFunctions';
// import Toast from '../components/Toast';
const Toast = lazy(() => import('../components/Toast'));
const LoaderFull = lazy(() => import('../components/LoaderFull'));
import FormWrapper from '../components/FormWrapper';

const EditProfile = () => {
  const userData = useSelector(state => state?.auth?.userData);
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
  });
  const [updateProfile, {isLoading, isError, error, isSuccess}] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (userData?.name) {
      let arr = userData?.name?.split(' ');
      setFormData({
        firstName: arr[0],
        lastName: arr[1] || '',
        email: userData?.email,
      });
    }
  }, [userData?.name]);

  useEffect(() => {
    if (isSuccess) {
      navigation.goBack();
    }
  }, [isSuccess]);

  const handleUpdate = () => {
    let fullName;
    if (formData.lastName) {
      fullName = formData.firstName.trim() + ' ' + formData.lastName.trim();
    } else {
      fullName = formData.firstName;
    }
    if (validateForm()) {
      updateProfile(JSON.stringify({name: fullName}));
    }
  };

  const validateForm = () => {
    const errors = {};
    for (const field in formData) {
      if (formData[field].trim() === '' && field != 'lastName') {
        errors[field] = true;
      }
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangeText = (fieldName, text) => {
    setFormData({
      ...formData,
      [fieldName]: text,
    });
    setFormErrors({...formErrors, [fieldName]: false});
  };

  return (
    <>
      {isLoading && <LoaderFull />}
      {isError && (
        <Toast visible={true} message={getErrorText(error)} type={'error'} />
      )}
      <FormWrapper>
        <Text style={styles.title}>{'Edit Profile'}</Text>

        {/* Pincode */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>First Name</Text>
          <TextInput
            style={[styles.input, formErrors.firstName && styles.error]}
            placeholder="First Name"
            value={formData.firstName}
            onChangeText={text => handleChangeText('firstName', text)}
            maxLength={15}
            placeholderTextColor={"gray"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Last Name</Text>
          <TextInput
            style={[styles.input, formErrors.lastName && styles.error]}
            placeholder="Last Name"
            value={formData.lastName}
            onChangeText={text => handleChangeText('lastName', text)}
            maxLength={15}
            placeholderTextColor={"gray"}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[
              styles.input,
              formErrors.email && styles.error,
              formData.email && styles.disabledInput, // Add a style for disabled input
            ]}
            placeholder="Email"
            value={formData.email}
            onChangeText={text => handleChangeText('email', text)}
            editable={false}
            placeholderTextColor={"gray"}
          />
        </View>
        {formErrors.firstName && (
          <Text style={styles.errorText}>First Name is required.</Text>
        )}
        {isError && (
          <Text style={styles.errorText}>
            {error?.data?.message?.toString() ||
              error?.error?.toString() ||
              error?.data?.error?.toString()}
          </Text>
        )}
        {/* <View style={styles.buttonContainer}>
          <Button
            title={'Save'}
            onPress={() => {
              handleUpdate();
            }}
            //color="#fff" // Text color
          /> */}
           <TouchableOpacity
              style={styles.button}
              onPress={() => {
                handleUpdate();
              }}>
              <Text style={styles.buttonText}>
                {'Save'}
              </Text>
            </TouchableOpacity>
       
      </FormWrapper>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonContainer: {
    backgroundColor: '#007BFF', // Button background color
    borderRadius: 5,
    padding: 5,
  },
  disabledInput: {
    backgroundColor: '#eee', // Change the background color for disabled input
    color: '#888', // Change the text color for disabled input
    borderColor: '#ccc', // Change the border color for disabled input
  },
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
