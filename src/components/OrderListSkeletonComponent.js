import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const OrderListSkeletonComponent = () => {
  return (
    <View
      style={{
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 16,
        marginHorizontal: 16,
      }}>
      <SkeletonPlaceholder>
        <View style={styles.productContainer}>
          
          <View style={styles.productInfo}>
            <View style={styles.productNameSkeleton} />
            <View style={styles.productPriceSkeleton} />
            <View style={styles.productNameSkeleton} />
            <View style={styles.productNameSkeleton1} />
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

export default OrderListSkeletonComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    // elevation: 3,
    // //  marginHorizontal: 16,
    // shadowColor: '#000',
    // shadowOffset: {width: 0, height: 2},
    // shadowOpacity: 0.2,
    // shadowRadius: 2,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 16,
  },
  productInfo: {
    flex: 1,
  
    marginHorizontal:16
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 8,
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
  productImageSkeleton: {
    width: 100,
    height: 100,
    borderRadius: 8,
    margin: 16,
    backgroundColor: '#E0E0E0', // Placeholder color
  },
  productNameSkeleton: {
    width: 80,
    height: 16,
    backgroundColor: '#E0E0E0', // Placeholder color
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
  },
  productNameSkeleton1: {
    width: 100,
    height: 16,
    backgroundColor: '#E0E0E0', // Placeholder color
    marginTop: 10,
    fontSize: 14,
    lineHeight: 18,
  },
  productPriceSkeleton: {
    width: 120,
    height: 16,
    backgroundColor: '#E0E0E0', // Placeholder color
    marginTop: 10,
    fontSize: 12,
  },
  addToCartButtonSkeleton: {
    width: 80,
    height: 32,
    backgroundColor: '#E0E0E0', // Placeholder color
    marginTop: 16,
  },
});
