import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

const FormWrapper = ({children,containerStyle}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 150}
    >
      <ScrollView contentContainerStyle={[styles.container,{...containerStyle}]}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FormWrapper;

const styles = StyleSheet.create({
  container: {
     padding: 16,
     backgroundColor: '#fff',
   },
});
