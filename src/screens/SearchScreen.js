import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import SearchBox1 from '../components/SearchList/SearchBox1';
import FormWrapper from '../components/FormWrapper';
import {
  setSelectedCategory,
  setDebouncedText,
  setSelectedText,
  useGetSuggestionsQuery,
} from '../redux/features/Search/searchSlice';

import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {
  productApi,
  resetProductList,
  setProductList,
  updatePageNumber,
} from '../redux/features/Product/productSlice';
import LoaderFull from '../components/LoaderFull';
import NoResultComponent from '../components/NoResultComponent';
import SearchList from '../components/SearchList/SearchList';

const SearchScreen = () => {

  const [searchText,setSearchText] = useState()



  







  return (
    <>
      <SearchBox1
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <SearchList/>
      
     
    
    </>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1, // Height of the separator line
    backgroundColor: '#ccc', // Color of the separator line
    marginHorizontal:10
  },
  text: {
    maxWidth: 250,
    color:"black"
  },
});
