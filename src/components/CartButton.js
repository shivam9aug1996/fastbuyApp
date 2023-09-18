import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { memo, useEffect } from 'react';
import {
  useAddToCartMutation,
  useRemoveFromCartMutation,
} from '../redux/features/Cart/cartSlice';
import {useSelector} from 'react-redux';
import LoaderFull from './LoaderFull';

const CartButton = ({item, removeFromCart,addToCart}) => {
  const userId = useSelector(state => state?.auth?.userData?.id);
console.log("rendering4567890-",item?.product?._id)

  return (
    <>
      <View style={styles.quantityControl}>
        <TouchableOpacity
          onPress={() => {
            removeFromCart({
              body: JSON.stringify({
                productId: item?.product?._id,
              }),
              param: userId,
            });
          }}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{item?.quantity}</Text>
        <TouchableOpacity
          onPress={() => {
            addToCart({
              body: JSON.stringify({
                productId: item?.product?._id,
              }),
              param: userId,
            });
          }}
          style={styles.quantityButton}>
          <Text style={styles.quantityButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default memo(CartButton);

const styles = StyleSheet.create({
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
    color:"black"
  },
});
