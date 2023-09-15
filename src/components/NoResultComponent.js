import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoResultComponent = () => {
  return (
    <View style={styles.noResultContainer}>
      <Text style={styles.noResultText}>Sorry, no result found.</Text>
      <Text style={styles.suggestionText}>Please check spelling or try searching for something else.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  noResultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  noResultText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  suggestionText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default NoResultComponent;
