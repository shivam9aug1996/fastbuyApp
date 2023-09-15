import React, {useEffect, useState} from 'react';
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
import {useLoginMutation} from '../redux/features/Auth/authSlice';
import { getErrorText } from '../utils/globalFunctions';

const Login = ({navigation}) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({
    email: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  const [login, {isSuccess, isLoading, isError,error}] = useLoginMutation();

  const handleLogin = () => {
    if (validateForm()) {
      login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigation.reset({
        index: 0,
        routes: [{name: 'Profile'}],
      });
      navigation.navigate('Home');
    }
  }, [isSuccess]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    const errors = {};

    // Email validation using regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(formData.email)) {
      errors.email = true;
    }

   else if (formData.password.trim() === '') {
      errors.password = true;
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
        <Text style={styles.title}>Login</Text>
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
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity
            onPress={togglePasswordVisibility}
            style={styles.togglePasswordButton}>
            <Text style={styles.togglePasswordText}>
              {showPassword ? 'Hide' : 'Show'} Password
            </Text>
          </TouchableOpacity>
        </View>
        {formErrors.email && (
          <Text style={styles.errorText}>Please enter a valid email.</Text>
        )}
        {formErrors.password && (
          <Text style={styles.errorText}>Password is required.</Text>
        )}
        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </FormWrapper>
    </>
  );
};

export default Login;

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
  loginButton: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    padding: 12,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
  },
  togglePasswordButton: {
    //  position: 'absolute',
    // top: 22,
    // right: 10,
    alignSelf: 'flex-end',
  },
  togglePasswordText: {
    color: '#007BFF',
  },
});
