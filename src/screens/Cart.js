import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import React, {lazy, useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {
  cartApi,
  resetCartSlice,
  setCart,
  setPaymentLoader,
  triggerCheckout,
  useAddToCartMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from '../redux/features/Cart/cartSlice';
// import CartButton from '../components/CartButton';
const CartButton = lazy(() => import('../components/CartButton'));

import ProductListSkeletonComponent from '../components/ProductListSkeletonComponent';
import CartListSkeletonComponent from '../components/CartListSkeletonComponent';
import withAuth from '../components/withAuth';
// import LoaderFull from '../components/LoaderFull';
const LoaderFull = lazy(() => import('../components/LoaderFull'));

import {useNavigation} from '@react-navigation/native';
import RazorpayCheckout from 'react-native-razorpay';
import {useCreateOrderMutation} from '../redux/features/Order/orderSlice';
// import Toast from '../components/Toast';
const Toast = lazy(() => import('../components/Toast'));

import { getErrorText } from '../utils/globalFunctions';

const Cart = () => {
  const cartData = useSelector(state => state?.cart?.cart || []);
  const placeOrder = useSelector(state => state?.cart?.placeOrder);
  const userId = useSelector(state => state?.auth?.userData?.id);
  const currentDeliveryAddressSelected = useSelector(
    state => state?.cart?.currentDeliveryAddressSelected,
  );
  const paymentLoader = useSelector(state => state?.cart?.paymentLoader);
  const token = useSelector(state => state?.auth?.token);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  let [paymentError, setPaymentError] = useState('');

  const dispatch = useDispatch();
  const {
    isSuccess,
    data,
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    error,
  } = useGetCartQuery({param: userId});
  const [
    addToCart,
    {
      isSuccess: isSuccess1,
      isLoading: isLoading1,
      isError: isError1,
      error: error1,
    },
  ] = useAddToCartMutation();

  const [
    removeFromCart,
    {
      isSuccess: isSuccess2,
      isLoading: isLoading2,
      isError: isError2,
      error: error2,
    },
  ] = useRemoveFromCartMutation();

  const [
    createOrder,
    {
      isSuccess: isSuccess3,
      isLoading: isLoading3,
      isError: isError3,
      error: error3,
    },
  ] = useCreateOrderMutation();

  console.log('u7654edfghj', paymentLoader);

  useEffect(() => {
    if (placeOrder) {
      checkoutStarted();
      dispatch(triggerCheckout(false));
    }
  }, [placeOrder]);

  useEffect(() => {
    if (isSuccess3) {
      dispatch(setCart([]));
      dispatch(resetCartSlice());
      navigation.navigate('Order');
    }
  }, [isSuccess3]);



  const checkoutStarted = async () => {
    console.log(currentDeliveryAddressSelected);
    // Alert.alert('hi');
    await createRazorpayOrder();
  };

  const createRazorpayOrder = async () => {
    dispatch(setPaymentLoader(true));
    let isChecked = false;
    let orderRes = await fetch(
      'https://redux-next-2.vercel.app/api/razorpayorder',
      {
        method: 'POST',
        body: JSON.stringify({
          amount: isChecked ? 200 : parseFloat(getTotalPrice()) * 100,
          isLive: isChecked,
        }),
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    );
    orderRes = await orderRes?.json();

    console.log('mjhgfdfghjkl', orderRes);

    if (orderRes?.res1?.id) {
      const options = {
        key: isChecked
          ? process.env.RAZORPAY_KEY_LIVE
          : process.env.RAZORPAY_KEY || 'rzp_test_dM1SSeT8CDsvcj',
        amount: orderRes.res1.amount,
        currency: orderRes.res1.currency,
        name: 'FastBuy',
        description: 'Order Payment',
        order_id: orderRes.res1.id,
        prefill: {
          name: 'Test User',
          email: 'test@example.com',
          contact: '9876543210',
        },
        error: function (error) {
          dispatch(setPaymentLoader(false));
          setPaymentError(JSON.stringify(error));
          console.log('Payment error:', error);
        },
      };
      RazorpayCheckout.open(options)
        .then(async data => {
          // handle success
          // Alert.alert(`Success: ${data.razorpay_payment_id}`);
          let res = await fetch(
            'https://redux-next-2.vercel.app/api/verifypayment',
            {
              method: 'POST',
              body: JSON.stringify({
                data: {
                  ...data,
                  check_order_id: orderRes.res1.id,
                  isLive: isChecked,
                },
              }),
              headers: {
                authorization: `Bearer ${token}`,
              },
            },
          );

          res = await res?.json();
          console.log(res);

          dispatch(setPaymentLoader(false));
          if (res?.verified) {
            let modifiedCartData = cartData?.map((item, index) => {
              return {
                ...item?.product,
                quantity: item?.quantity,
                productId: item?.productId,
                razorpay_order_id: orderRes.res1.id,
              };
            });
            console.log(modifiedCartData);
            createOrder({
              body: JSON.stringify({
                orderList: modifiedCartData,
                address: currentDeliveryAddressSelected,
              }),
              param: userId,
            });
          } else {
            dispatch(setPaymentLoader(false));
            setPaymentError('Unauthorized payment');
          }
        })
        .catch(error => {
          // handle failure
          dispatch(setPaymentLoader(false));
          setPaymentError(`Error: ${error.code} | ${error.description}`);
        });
    } else {
      //console.error(orderRes);
      dispatch(setPaymentLoader(false));
      setPaymentError(JSON.stringify(orderRes));
    }
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(cartApi.util.resetApiState());
    // dispatch(cartApi.endpoints.getCart.initiate());

    setRefreshing(false);
  }, []);

  const renderItem = ({item}) => {
    if (isLoading) {
      return <CartListSkeletonComponent />;
    } else {
      return (
        <View style={styles.cartItem}>
          <Image
            source={{uri: item?.product?.image}}
            style={styles.productImage}
          />
          <View style={styles.productDetails}>
            <Text style={styles.productName}>{item?.product?.name}</Text>
            <Text style={styles.productPrice}>
              Price: &#8377;{item?.product?.price}
            </Text>
            <CartButton
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
            <Text style={styles.totalPrice}>
              Total: &#8377;{item?.quantity * item?.product?.price}
            </Text>
          </View>
        </View>
      );
    }
  };

  const getTotalPrice = () => {
    let total = 0;
    cartData.forEach(item => {
      total += item?.quantity * item?.product?.price;
    });
    return total.toFixed(2);
  };

  const checkout = data => {
    console.log('hiiiii', data);
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyCartContainer}>
        <Text style={styles.emptyCartText}>Your cart is empty</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')} // Replace 'ProductList' with the screen you want to navigate to
          style={styles.emptyCartButton}>
          <Text style={styles.emptyCartButtonText}>Start Shopping</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      {isLoading1 || isLoading2 ? <LoaderFull /> : null}

      <View style={styles.container}>
        {isError && (
          <Toast visible={true} message={getErrorText(error)} type={'error'} />
        )}
        {isError1 && (
          <Toast visible={true} message={getErrorText(error1)} type={'error'} />
        )}
        {isError2 && (
          <Toast visible={true} message={getErrorText(error2)} type={'error'} />
        )}
        {isError3 && (
          <Toast visible={true} message={getErrorText(error3)} type={'error'} />
        )}
        <FlatList
          ListEmptyComponent={renderEmptyComponent}
          data={
            !isLoading
              ? cartData
              : [
                  {product: {_id: 1}},
                  {product: {_id: 2}},
                  {product: {_id: 3}},
                  {product: {_id: 4}},
                  {product: {_id: 5}},
                ]
          }
          keyExtractor={item => item?.product?._id}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
        />
        {!isLoading && cartData.length != 0 ? (
          <>
            <View style={styles.totalPriceContainer}>
              <Text style={styles.totalPriceText}>Total Price:</Text>
              <Text style={styles.totalPriceValue}>
                &#8377;{getTotalPrice()}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddressList', {
                  showRadioButton: true,
                })
              }
              style={[
                styles.placeOrderButton,
                isLoading && styles.disabledButton,
              ]}
              disabled={isLoading}>
              <Text
                style={[
                  styles.placeOrderButtonText,
                  isLoading && styles.disabledText,
                ]}>
                Place Order
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
      </View>
    </>
  );
};

export default withAuth(Cart);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 16,
  },
  cartItem: {
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
  productDetails: {
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
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 10, // Adjust the padding to increase the touchable area
    backgroundColor: 'lightgray',
    borderRadius: 4,
    marginHorizontal: 4,
  },
  quantityButtonText: {
    fontSize: 16,
    color:"black"
  },
  quantity: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color:"black"
  },
  totalPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 20,
  },
  totalPriceText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:"black"
  },
  totalPriceValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  placeOrderButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'center',
  },
  placeOrderButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  disabledButton: {
    backgroundColor: 'gray', // Customize the disabled button style
  },
  disabledText: {
    color: 'lightgray', // Customize the disabled text style
  },
  emptyCartContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCartText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color:"black"
  },
  emptyCartButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyCartButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
