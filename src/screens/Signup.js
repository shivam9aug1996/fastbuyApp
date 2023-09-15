import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FormWrapper from '../components/FormWrapper';
import LoaderFull from '../components/LoaderFull';
import Toast from '../components/Toast';
import { useSignupMutation } from '../redux/features/Auth/authSlice';
import { getErrorText } from '../utils/globalFunctions';

const Signup = () => {
const navigation = useNavigation()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false); // Track password visibility
 

  const [signup, { isSuccess, data: token, isLoading, isError, error }] =
    useSignupMutation();

    useEffect(()=>{
      if(isSuccess){
        navigation.navigate("Home")
      }
    },[isSuccess])

  const handleSignup = () => {
    if (validateForm()) {
      signup(
        JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        })
      );
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    // Email validation using regex
    if (formData.name.trim() === '') {
      errors.name = true;
    }
    
   else if (!emailRegex.test(formData.email)) {
      errors.email = true;
    }

   else if (formData.password.trim() === '') {
      errors.password = true;
    }

   

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, formErrors.name && styles.error]}
            placeholder="Name"
            value={formData.name}
            onChangeText={text => handleChangeText('name', text)}
            placeholderTextColor={"gray"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, formErrors.email && styles.error]}
            placeholder="Email"
            value={formData.email}
            onChangeText={text => handleChangeText('email', text)}
            autoCapitalize="none"
            maxLength={50}
            placeholderTextColor={"gray"}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={[styles.input, formErrors.password && styles.error]}
            placeholder="Password"
            secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
            value={formData.password}
            onChangeText={text => handleChangeText('password', text)}
            maxLength={20}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.togglePasswordButton}>
            <Text style={styles.togglePasswordText}>
              {showPassword ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>
        </View>
        {formErrors.name && (
          <Text style={styles.errorText}>Name is required.</Text>
        )}
        {formErrors.email && (
          <Text style={styles.errorText}>Please enter a valid email.</Text>
        )}
        {formErrors.password && (
          <Text style={styles.errorText}>Password is required.</Text>
        )}
        <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </FormWrapper>
    </>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign:"center",
    color:"black"
  },
  inputContainer: {
    marginBottom: 10,
    width: '100%',
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
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signupButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
  },
  togglePasswordButton: {
    alignSelf: 'flex-end',
  },
  togglePasswordText: {
    color: '#007BFF',
  },
});
