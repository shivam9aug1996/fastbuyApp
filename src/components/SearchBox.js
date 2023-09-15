import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Pressable,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useSelector} from 'react-redux';

const SearchBox = ({selectedText}) => {
  const selectedCategory = useSelector(
    state => state?.search?.selectedCategory,
  );
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const refInput = useRef();

  const isFocused = useIsFocused();
  useEffect(() => {
    // Automatically focus on the TextInput when the screen is in focus
    if (isFocused) {
     
      setSearchText(selectedText);
    }
  }, [isFocused]);

  const handleSearch = () => {
   Keyboard.dismiss()
    if (selectedCategory?._id) {
      navigation.goBack();
    }

    navigation.navigate('Search');
  };


  return (
    <Pressable onPress={() => handleSearch()} style={styles.container}>
      <Icon
        name="search"
        size={24}
        color="#007AFF"
        //onPress={handleSearch}
        style={styles.icon}
      />
      <TextInput
        ref={refInput}
        style={styles.input}
        placeholder="Search..."
         onFocus={() => {
           handleSearch()
         }} // Set focus state to true
        value={searchText}
        placeholderTextColor={'gray'}
        editable={Platform.OS=="android"?false:true}
        
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    margin: 10,

    // backgroundColor:"green"
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
    // backgroundColor:"red",
  },
  icon: {
    padding: 10,
  },
});

export default SearchBox;
