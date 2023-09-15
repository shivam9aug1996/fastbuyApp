import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

const RetryComponent = ({ onRetryPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Something went wrong. Please try again.</Text>
      <TouchableOpacity onPress={onRetryPress} style={styles.button}>
        <Text style={styles.buttonText}>Retry</Text>
      </TouchableOpacity>
      <Text style={styles.additionalText}>
        If the issue persists, check your internet connection.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight:400
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF', // Replace with your desired button styling
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  additionalText: {
    marginTop: 10,
    fontSize: 14,
    color: '#888', // You can customize the color
  },
});

export default RetryComponent;
