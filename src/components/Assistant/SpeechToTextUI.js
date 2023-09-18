import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can choose an appropriate icon

const SpeechToTextUI = ({
  start,
  stop,
  started,
  end,
  cancel,
  destroy,
  volume,
}) => {
  const handleToggleRecording = () => {
    if (started) {
      cancel();
    } else {
      start();
    }
  };

  // Calculate the background color based on the volume level (0-10)
  const borderWidth = +volume+1 ;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { borderWidth: borderWidth,borderColor:`rgba(0, 255, 0, ${+volume+1})`}]} 
        onPress={handleToggleRecording}
        activeOpacity={0.7}>
        <Icon
          name={started ? 'microphone-slash' : 'microphone'}
          size={30}
          color={started ? 'green' : 'black'}
        />
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 160,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9000,
  },
  button: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 70,
    backgroundColor: 'white',
    borderRadius: 100,
  },
  statusText: {
    marginTop: 10,
    fontSize: 18,
  },
});

export default SpeechToTextUI;
