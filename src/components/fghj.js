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
// import AddToCart from './AddToCart';
const AddToCart = lazy(() => import('./AddToCart'));
const LoaderFull = lazy(() => import('./LoaderFull'));
// import LoaderFull from './LoaderFull';
import {useAddToCartMutation} from '../redux/features/Cart/cartSlice';
// import Toast from './Toast';
const Toast = lazy(() => import('./Toast'));
import {getErrorText} from '../utils/globalFunctions';
import RetryComponent from './RetryComponent';
import Icon from 'react-native-vector-icons/FontAwesome'; 

const ProductList = () => {
  const productList = useSelector(state => state?.products.productList || []);
  const pageNumber = useSelector(state => state?.products?.pageNumber);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [customError,setCustomError] = useState({isError:false,error:undefined})

  const {data, isError, error, isFetching, isLoading,isSuccess,refetch} = useGetProductsQuery([
    'getProducts',
    {page: pageNumber}
  ]);
  
  const [
    addToCart,
    {
      isSuccess: isSuccess1,
      data: data1,
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
      reset:reset1
    },
  ] = useAddToCartMutation();

  useEffect(()=>{
    if(isError){
      setCustomError({isError:true,error:error})
    }
    // if(!isError){
    //   setCustomError({isError:false,error:undefined})
    // }
    if(isError1){
      setCustomError({isError:true,error:error1})
    }
    // if(!isError1){
    //   setCustomError({isError:false,error:undefined})
    // }
  },[isError,isError1])

  console.log('gfe345678ytfghj', data, isError, isError1);

  const handleEndReached = useCallback(() => {
    console.log(
      'hi',
      data?.pagination?.currentPage,
      data?.pagination?.totalPages,
      isFetching,
    );
    if (
      data?.pagination?.currentPage < data?.pagination?.totalPages &&
      !isFetching
    ) {
      dispatch(updatePageNumber());
    }
  }, [data, isFetching]);

  

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
   // dispatch(setProductList([{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}]));
    
    dispatch(updatePageNumber(1));
   // refetch()
  setTimeout(() => {
    //dispatch(resetProductList());
    dispatch(productApi.util.resetApiState());
  }, 100);
  //   dispatch(productApi.util.invalidateTags(['products']))
   // refetch()
    setRefreshing(false);
  }, []);

  console.log('67890987654erghj', data,isLoading);

  const renderItem = ({item}) => {
    if (isLoading) {
      return <ProductListSkeletonComponent />;
    } else if(isSuccess){
      return (
        <View style={styles.productContainer}>
          <Image source={{uri: item?.image}} style={styles.productImage} />
          <View style={styles.productInfo}>
            <Text style={styles.productName}>{item?.name}</Text>
            <Text style={styles.productPrice}>Price: &#8377;{item?.price}</Text>
          </View>
         
         <AddToCart productId={item?._id} addToCart={addToCart} />
         
        </View>
      );
    }else{
      return(
        <RetryComponent onRetryPress={()=>handleRefresh()}/>
      )
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
    if (
      isFetching &&
      data?.pagination?.currentPage < data?.pagination?.totalPages
    ) {
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
    } else {
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
        <Toast visible={true} message={getErrorText(customError.error)} type={'error'} onDismiss={()=>setCustomError({isError:false,error:undefined})} />
      )}
      {isLoading1 && <LoaderFull />}
      <View style={styles.container}>
        <FlatList
          data={
            isSuccess
              ? productList
              : isLoading? [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}]:[{_id:1}]
          }
          keyExtractor={item => item?._id}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.1}
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
    color:"black"
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
});
