import {useNavigation, useIsFocused} from '@react-navigation/native';
import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useLayoutEffect,
} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  FlatList,
  Text,
  Alert,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {
  productApi,
  updatePageNumber,
} from '../redux/features/Product/productSlice';
import {
  setSelectedCategory,
  setDebouncedText,
  setSelectedText,
  useGetSuggestionsQuery,
} from '../redux/features/Search/searchSlice';
import FormWrapper from './FormWrapper';

const debounce = (func, delay) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchBox1 = ({searchText, setSearchText}) => {
  const debouncedText = useSelector(state => state?.search?.debouncedText);
  const selectedText = useSelector(state => state?.search?.selectedText);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  //  const [finalSearchText, setFinalSearchText] = useState('');
  const textInputRef = useRef(null);
  // const { data, error, status } = useGetSuggestionsQuery(finalSearchText, {
  //   skip:finalSearchText!==""?false:true,
  // });
  // console.log("hgfdfio8678",data)// i am getting data but on each type of input api hits there must be  delay
  // console.log('juytredfghjkl', finalSearchText2);

  // useEffect(() => {
  //   // Automatically focus on the TextInput when the screen is in focus
  //   if (isFocused) {
  //     if (finalSearchText2) {
  //       setFinalSearchText(finalSearchText2);
  //       //dispatch(setFinalSearchText(finalSearchText2));
  //       // setLoader1(true)
  //       setSearchText(finalSearchText2);
  //       //dispatch(productApi.util.invalidateTags(["products"]))
  //       dispatch(updatePageNumber(1));
  //       dispatch(productApi.util.resetApiState());
  //     } else {
  //       setSearchText(finalSearchText);
  //     }

  //     textInputRef.current.focus();
  //   }
  // }, [isFocused, finalSearchText2]);

  useEffect(() => {
    // Automatically focus on the TextInput when the screen is in focus
    let timer
    if (isFocused) {
      setSearchText(selectedText);
      if (Platform.OS == 'android') {
        textInputRef?.current?.focus();
      } else {
        timer= setTimeout(() => {
          textInputRef?.current?.focus();
        }, 700);
      }
    }
    return ()=>{
      clearTimeout(timer)
    }
  }, [isFocused]);

  const handleSearch = useCallback(data => {
    dispatch(setDebouncedText(data));
    dispatch(setSelectedText(''));
    // setFinalSearchText(data);
    // Add your navigation logic or any other code here
  }, []);

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 800), []);

  useEffect(() => {
    debouncedHandleSearch(searchText); // Call the debounced function when searchText changes
  }, [searchText, debouncedHandleSearch]);

  return (
    <View style={styles.container}>
      <Icon
        name="search"
        size={24}
        color="#007AFF"
        // onPress={handleSearch}
        style={styles.icon}
      />
      <TextInput
        ref={textInputRef} // Assign the ref to the TextInput
        style={styles.input}
        placeholder="Search..."
        placeholderTextColor={'gray'}
        //defaultValue={debouncedText}
        value={searchText}
        onChangeText={text => setSearchText(text)}
        onSubmitEditing={() => {
          if (searchText) {
            navigation.navigate('SearchResult');
            dispatch(setSelectedText(searchText));
            dispatch(setSelectedCategory(null));
            setTimeout(() => {
              dispatch(setDebouncedText(searchText));
            }, 800);
            dispatch(updatePageNumber(1));
            dispatch(productApi.util.resetApiState());
          } else {
            Keyboard.dismiss();
          }
        }}
      />
      {searchText && (
        <Icon
          name="times-circle"
          size={20}
          color="#007AFF"
          onPress={() => setSearchText('')}
        />
      )}
    </View>
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
    //backgroundColor:"green"
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
});

export default SearchBox1;
