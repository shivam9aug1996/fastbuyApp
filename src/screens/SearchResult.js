import React from 'react'
import { Text } from 'react-native'
import { useSelector } from 'react-redux'
import DemoFlatList from '../components/Demo/DemoFlatList'
import ProductList from '../components/ProductList/ProductList'
import SearchBox from '../components/SearchBox'


const SearchResult = () => {
  const selectedText = useSelector(state => state?.search?.selectedText);
  return (
    <>
    <SearchBox selectedText={selectedText}/>
    <ProductList/>
    {/* <DemoFlatList/> */}
    </>
  )
}

export default SearchResult