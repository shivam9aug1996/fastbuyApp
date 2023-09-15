import React, { useEffect, useState, useRef } from 'react';
import { Text, TextInput, View, Animated, Easing, StyleSheet } from 'react-native';

const FloatingLabelInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: isFocused || value ? -25 : 0,
      duration: 200,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start();
  }, [isFocused, value]);

  return (
    <View style={styles.inputContainer}>
      <View style={styles.inputWrapper}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor="#666"
        />
        <Animated.View
          style={[
            styles.labelContainer,
            {
              transform: [{ translateY }],
            },
          ]}
        >
          <Text style={styles.label}>{label}</Text>
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 10,
  },
  inputWrapper: {
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 5,
    paddingHorizontal: 10,
    position: 'relative',
  },
  input: {
    fontSize: 18,
    paddingVertical: 10,
    color: '#333',
  },
  labelContainer: {
    position: 'absolute',
    top: 5,
    left: 15,
    backgroundColor: 'white',
    paddingHorizontal: 5,
  },
  label: {
    fontSize: 14,
    color: '#333',
  },
});

export default FloatingLabelInput;
