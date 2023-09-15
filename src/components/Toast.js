import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';

const Toast = ({ visible, message, type, onDismiss }) => {
  const slideAnim = new Animated.Value(-1000);

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideToast = () => {
    Animated.timing(slideAnim, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: true,
    }).start(onDismiss);
  };

  const backgroundColors = {
    success: 'green',
    error: 'red',
    info: 'blue',
  };

  const textColors = {
    success: 'white',
    error: 'white',
    info: 'white',
  };

  return (
    <TouchableWithoutFeedback onPress={hideToast}>
      <Animated.View
        style={[
          styles.container,
          { backgroundColor: backgroundColors[type] || 'gray', transform: [{ translateY: slideAnim }] },
        ]}
      >
        <Text style={[styles.toastText, { color: textColors[type] || 'black' }]}>{message}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 16,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 80,
    top: 0,
    left: 30,
    right: 30,
    borderRadius: 50,
    elevation: 4,
  },
  toastText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Toast;
