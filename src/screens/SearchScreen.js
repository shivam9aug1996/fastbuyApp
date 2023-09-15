import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import SearchBox1 from '../components/SearchBox1';
import FormWrapper from '../components/FormWrapper';
import {
  setSelectedCategory,
  setDebouncedText,
  setSelectedText,
  useGetSuggestionsQuery,
} from '../redux/features/Search/searchSlice';
import Icon from 'react-native-vector-icons/FontAwesome'; 
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

const SearchScreen = () => {
  const debouncedText = useSelector(state => state?.search?.debouncedText);
  const selectedText = useSelector(state => state?.search?.selectedText);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [searchText,setSearchText] = useState()

  const {data, error, status, isLoading, isFetching, isSuccess,isError} =
    useGetSuggestionsQuery(debouncedText);

  

    // useEffect(() => {
    //   // Automatically focus on the TextInput when the screen is in focus
    //   if (isFocused) {
    //     setSearchText(selectedText);
  
        
    //   }
    // }, [isFocused]);


  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };



  return (
    <>
      <SearchBox1
        searchText={searchText}
        setSearchText={setSearchText}
      />
      {isFetching && <LoaderFull />}
      
      <FlatList
      keyboardShouldPersistTaps={"always"}
        data={data?.data}
        keyExtractor={(item, index) => index.toString()}
        keyboardDismissMode="on-drag" 
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => {
              navigation.navigate('SearchResult');
              dispatch(setSelectedText(item?.name));
              dispatch(setSelectedCategory(null))
             setTimeout(() => {
              dispatch(setDebouncedText(item?.name))
             }, 800);
              dispatch(updatePageNumber(1));
              dispatch(productApi.util.resetApiState());
             
            }}>
            <Text style={styles.text}>{item?.name}</Text>
            <Icon name="long-arrow-right" size={20} color="#007AFF" />
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={renderSeparator} 
        ListEmptyComponent={isSuccess&&<NoResultComponent/>}
      />
    
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
