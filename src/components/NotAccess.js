import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const NotAccess = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* UI for users who are not logged in */}
      <Text style={styles.title}>Welcome to Our App</Text>
      <Text style={styles.message}>
        Please log in to access the app's features.
      </Text>
      <Button title="Login" onPress={()=>navigation.navigate("Login")} />
    </View>
  );
};

export default NotAccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"black"
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    color:"black"
  },
});
