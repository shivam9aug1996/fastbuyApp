import {View, Text, Button} from 'react-native';
import React, {lazy, Suspense, useEffect} from 'react';
import ProductList from '../components/ProductList';

import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  setSelectedCategory,
  setDebouncedText,
  setSelectedText,
} from '../redux/features/Search/searchSlice';
import {
  productApi,
  updatePageNumber,
} from '../redux/features/Product/productSlice';
import Custom from '../components/Carousel/Custom';
// import Category from '../components/Category';
// import SearchBox from '../components/SearchBox';
const Category = lazy(() => import('../components/Category/Category'));
const SearchBox = lazy(() => import('../components/SearchBox'));

const Home = ({navigation}) => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    // Automatically focus on the TextInput when the screen is in focus
    if (isFocused) {
      dispatch(setDebouncedText(''));
      dispatch(updatePageNumber(1));
      dispatch(productApi.util.resetApiState());
      dispatch(setSelectedText(''));
      dispatch(setSelectedCategory(null));
    }
  }, [isFocused]);
  return (
    <>
      <Suspense fallback={<View></View>}>
        <SearchBox />
      </Suspense>
      <Suspense fallback={<View></View>}>
        <Category />
      </Suspense>
    </>
  );
};

export default Home;
