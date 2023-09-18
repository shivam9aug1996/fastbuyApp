import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setDebouncedText, setSelectedCategory, setSelectedText, useGetSuggestionsQuery } from '../../redux/features/Search/searchSlice';
import NoResultComponent from '../NoResultComponent';
import SearchListRenderItem from './SearchListRenderItem';
import { productApi, updatePageNumber } from '../../redux/features/Product/productSlice';


const SearchList = () => {
  const debouncedText = useSelector(state => state?.search?.debouncedText);
  const selectedText = useSelector(state => state?.search?.selectedText);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {data, error, status, isLoading, isFetching, isSuccess,isError} =
  useGetSuggestionsQuery(debouncedText);

  const renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  const handlePress=useCallback((item)=>{
    navigation.goBack()
    navigation.navigate('SearchResult');
    dispatch(setSelectedText(item?.name));
    dispatch(setSelectedCategory(null))
   setTimeout(() => {
    dispatch(setDebouncedText(item?.name))
   }, 800);
    dispatch(updatePageNumber(1));
    dispatch(productApi.util.resetApiState());
  },[])

  const renderItem=({item}) => {
    
    return (
     <SearchListRenderItem handlePress={handlePress} item={item}/>
    )
  }


  return (
     <FlatList
      keyboardShouldPersistTaps={"always"}
        data={data?.data}
        keyExtractor={(item, index) => index.toString()}
        keyboardDismissMode="on-drag" 
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator} 
        ListEmptyComponent={isSuccess&&<NoResultComponent/>}
      />
  )
}

export default SearchList

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
})