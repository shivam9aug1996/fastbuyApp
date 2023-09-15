import { ActivityIndicator, StyleSheet, View } from 'react-native';
import React from 'react';

const LoaderFull = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="black" />
    </View>
  );
};

export default LoaderFull;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, // Use absolute fill to take up the whole screen
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Semi-transparent background
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 51, // Adjust the zIndex as needed
  },
});
