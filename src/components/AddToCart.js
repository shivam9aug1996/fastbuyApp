import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useAddToCartMutation} from '../redux/features/Cart/cartSlice';
import {useNavigation} from '@react-navigation/native';

const AddToCart = ({productId,addToCart}) => {
  const userId = useSelector(state => state?.auth?.userData?.id);
  const cartData = useSelector(state => state?.cart?.cart || []);
  const [productInCart, setProductInCart] = useState(false);
  const navigation = useNavigation();

 

  useEffect(() => {
    if (checkProductIsInCart(cartData, productId) && userId) {
      setProductInCart(true);
    } else {
      setProductInCart(false);
    }
  }, [cartData]);

  const checkProductIsInCart = (cartData, productId) => {
    let data = cartData?.filter((item, index) => {
      return productId == item?.product?._id;
    });
    if (data?.length > 0) return true;
    else return false;
  };

  const handlePress = () => {
    if (productInCart) {
      navigation.navigate('Cart');
    } else {
      addToCart({
        body: JSON.stringify({
          productId,
        }),
        param: userId,
      });
    }
  };

  return (
    // <View style={styles.buttonContainer}>
    // <TouchableOpacity
      // style={
      //   productInCart
      //     ? [styles.addToCartButton, {backgroundColor: 'green'}]
      //     : styles.addToCartButton
      // }
    //   onPress={() => {
    //     handlePress();
    //   }}>
    //   <Text style={styles.addToCartButtonText}>
    //     {productInCart ? 'Go to Cart' : 'Add to Cart'}
    //   </Text>
    // </TouchableOpacity>
    // </View>
    <TouchableOpacity onPress={() => handlePress()} style={
      productInCart
        ? [styles.addToCartButton, {backgroundColor: 'green'}]
        : styles.addToCartButton
    }>
    <Text style={styles.addToCartButtonText}>{productInCart ? 'Go to Cart' : 'Add to Cart'}</Text>
  </TouchableOpacity>
  );
};

export default AddToCart;

const styles = StyleSheet.create({
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
