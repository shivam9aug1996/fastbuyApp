import { Image, StyleSheet, Text, View } from 'react-native'
import React, { lazy, memo } from 'react'
const AddToCart = lazy(() => import('./AddToCart'));

const ProductListRenderItem = ({item,addingToCart}) => {
  console.log("ProductListRenderItem rendering")
  return (
    <View style={styles.productContainer}>
        <Image source={{uri: item?.image}} style={styles.productImage} />

        <Text style={styles.productName}>{item?.name}</Text>

        <View style={styles.productInfo}>
          <Text style={styles.productPrice}>Price: ₹{item?.price}</Text>
        </View>

        <AddToCart productId={item?._id} addingToCart={addingToCart} />
      </View>
  )
}

export default memo(ProductListRenderItem)

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
    marginTop: 16,
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
})