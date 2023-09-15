import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {lazy, Suspense, useCallback, useEffect, useState} from 'react';
import {
  productApi,
  resetProductList,
  setProductList,
  updatePageNumber,
  useGetProductsQuery,
} from '../redux/features/Product/productSlice';
import {useDispatch, useSelector} from 'react-redux';
import ProductListSkeletonComponent from './ProductListSkeletonComponent';
const AddToCart = lazy(() => import('./AddToCart'));
const LoaderFull = lazy(() => import('./LoaderFull'));
import {useAddToCartMutation} from '../redux/features/Cart/cartSlice';
const Toast = lazy(() => import('./Toast'));
import {getErrorText} from '../utils/globalFunctions';
const RetryComponent = lazy(() => import('./RetryComponent'));
import Icon from 'react-native-vector-icons/FontAwesome';
import {useIsFocused} from '@react-navigation/native';

const ProductList = () => {
  const selectedText = useSelector(state => state?.search?.selectedText);
  const selectedCategory = useSelector(
    state => state?.search?.selectedCategory,
  );
  const pageNumber = useSelector(state => state?.products?.pageNumber);

  const productList = useSelector(state => state?.products.productList || []);

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [localParams, setLocalParams] = useState({
    selectedText: '',
    categoryId: null,
    pageNumber: 1,
    hit: false,
  });
  const [customError, setCustomError] = useState({
    isError: false,
    error: undefined,
  });
  const isFocused = useIsFocused();
  const {data, isError, error, isFetching, isLoading, isSuccess, refetch} =
    useGetProductsQuery(
      [
        `getProducts`,
        {
          page: localParams.pageNumber,
          search_keyword: localParams.selectedText,
          category_id: localParams.categoryId,
        },
      ],
      {skip: !localParams.hit},
    );

  const [
    addToCart,
    {
      isSuccess: isSuccess1,
      data: data1,
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
      reset: reset1,
    },
  ] = useAddToCartMutation();

  useEffect(() => {
    if (isFocused && !localParams.hit) {
      //Alert.alert("hi")
      setLocalParams({
        selectedText: selectedText,
        categoryId: selectedCategory?._id,
        pageNumber: pageNumber,
        hit: true,
      });
    }
  }, [isFocused, pageNumber, localParams.hit]);

  useEffect(() => {
    if (isError) {
      setCustomError({isError: true, error: error});
    }
    // if(!isError){
    //   setCustomError({isError:false,error:undefined})
    // }
    if (isError1) {
      setCustomError({isError: true, error: error1});
    }
    // if(!isError1){
    //   setCustomError({isError:false,error:undefined})
    // }
  }, [isError, isError1]);

  console.log('gfe345678ytfghj', data?.pagination, isFetching, isLoading);

  const handleEndReached = useCallback(() => {
    console.log(
      'hi',
      data?.pagination?.currentPage,
      data?.pagination?.totalPages,
      isFetching,
    );
    if (
      data?.pagination?.currentPage < data?.pagination?.totalPages &&
      !isFetching &&
      productList?.length > 0
    ) {
      dispatch(updatePageNumber());
      setLocalParams({...localParams, hit: false});
    }
  }, [data, isFetching]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    // dispatch(setProductList([{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}]));

    dispatch(productApi.util.resetApiState());
    setLocalParams({...localParams, hit: false});
    dispatch(updatePageNumber(1));
    // setTimeout(() => {

    // dispatch(productApi.util.invalidateTags(['products']));
    // }, 100);

    setRefreshing(false);
  }, []);

  console.log('67890987654erghj', data, isLoading);

  const renderItem = ({item,index}) => {
  //   return index==0?<ProductListSkeletonComponent />:  <View style={styles.productContainer}>
  //   <Image source={{uri: item?.image}} style={styles.productImage} />

  //   <Text style={styles.productName}>{item?.name}</Text>

  //   <View style={styles.productInfo}>
  //     <Text style={styles.productPrice}>Price: ₹{item?.price}</Text>
  //   </View>

  //   <TouchableOpacity onPress={() => {}} style={styles.addToCartButton}>
  //     <Text style={styles.addToCartButtonText}>Add to Cart</Text>
  //   </TouchableOpacity>
  // </View>

        

   // return <ProductListSkeletonComponent />
    
    if (isFetching && pageNumber == 1) {
      return <ProductListSkeletonComponent />;
    } else if (isError) {
      return <RetryComponent onRetryPress={() => handleRefresh()} />;
    } else {
      return (
        <View style={styles.productContainer}>
          <Image source={{uri: item?.image}} style={styles.productImage} />

          <Text style={styles.productName}>{item?.name}</Text>

          <View style={styles.productInfo}>
            <Text style={styles.productPrice}>Price: ₹{item?.price}</Text>
          </View>

          <AddToCart productId={item?._id} addToCart={addToCart} />
        </View>
      );
    }
  };

  const calculateLeftProducts = paginationData => {
    let {totalItems, itemsPerPage, currentPage} = paginationData;
    currentPage = currentPage + 1;
    let leftProducts = totalItems - itemsPerPage * (currentPage - 1);
    leftProducts = leftProducts > itemsPerPage ? itemsPerPage : leftProducts;
    return leftProducts;
  };

  const paginationLoader = () => {
    if (data?.pagination?.currentPage < data?.pagination?.totalPages&&!isFetching) {
      // const leftProducts = calculateLeftProducts(data?.pagination);
      // let arr = new Array(leftProducts).fill(0);
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
           <ProductListSkeletonComponent key={1} />
          {/* <ActivityIndicator size="small" color="orange" /> */}
          {/* {arr.map((item, index) => {
            return <ProductListSkeletonComponent key={index} />;
          })} */}
        </View>
      );
    } else if(data?.pagination?.currentPage < data?.pagination?.totalPages&&isFetching){
      const leftProducts = calculateLeftProducts(data?.pagination);
      let arr = new Array(leftProducts).fill(0);
      return (
        <View style={{flex: 1, flexDirection: 'column'}}>
          
          {/* <ActivityIndicator size="small" color="orange" /> */}
          {arr.map((item, index) => {
            return <ProductListSkeletonComponent key={index} />;
          })}
        </View>
      );
    }
     {
      return null;
    }
  };

  console.log('765edfghjfdsdfghj', error1, getErrorText(error1));

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Icon name="exclamation-circle" size={50} color="#888" />
        <Text style={styles.emptyText}>No products available</Text>
      </View>
    );
  };

  return (
    <>
      {customError.isError && (
        <Toast
          visible={true}
          message={getErrorText(customError.error)}
          type={'error'}
          onDismiss={() => setCustomError({isError: false, error: undefined})}
        />
      )}
      {isLoading1 && <LoaderFull />}
      <View style={styles.container}>
        <FlatList
        // initialNumToRender={2}
        // maxToRenderPerBatch={5}
          // maxToRenderPerBatch={5}
          // initialNumToRender={5}
          data={
            isFetching && pageNumber == 1
              ? [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}]
              : isError
              ? [{_id: 1}]
              : productList
          }
          keyExtractor={item => item?._id}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          ListFooterComponent={paginationLoader} // Show the loader when isFetching is true
          ListEmptyComponent={renderEmptyComponent}
        />
      </View>
    </>
  );
};

export default ProductList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginVertical: 16,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 16,
    marginLeft: 16,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 16,
  },
  productInfo: {
    flex: 1,
    marginVertical: 16,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  productPrice: {
    fontSize: 16,
    color: 'gray',
  },
  addToCartButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 16,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  paginationLoaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paginationLoaderText: {
    marginLeft: 10,
    color: 'gray',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginTop: 10,
    color: '#888',
  },



  

  productContainer: {
    backgroundColor: 'white',
    marginBottom: 16,
    borderRadius: 8,
    elevation: 3,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    objectFit: 'contain',
    marginTop:16
  },

  productName: {
    fontSize: 17, // Increased font size

    marginVertical: 8,
    marginHorizontal: 16,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Arial', // Change the font family (You can replace 'Arial' with your desired font)
    marginVertical: 8,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 16,
    marginHorizontal: 16,
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 18, // Increase the font size
    color: 'darkorange', // Make the price text more prominent
    fontWeight: 'bold', // Make the price text bold
  },
  addToCartButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  addToCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center', // Center-align the button text
  },
});
