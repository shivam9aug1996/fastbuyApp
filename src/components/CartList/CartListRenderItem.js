import { Image, StyleSheet, Text, View } from 'react-native'
import React, { lazy, memo } from 'react'
const CartButton = lazy(() => import('../CartButton'));
// import CartButton from '../CartButton'


const CartListRenderItem = ({item,addToCart,removeFromCart}) => {
  console.log("98765rfghjkjgfdfghjkl")
  return (
    <View style={styles.cartItem}>
      <Image source={{uri: item?.product?.image}} style={styles.productImage} />
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
  )
}

export default memo(CartListRenderItem)

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
    color: 'black',
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
    color: 'black',
  },
  quantity: {
    fontSize: 16,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
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
    color: 'black',
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
    color: 'black',
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
})