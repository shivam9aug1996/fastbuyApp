import { StyleSheet, View } from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ProductListSkeletonComponent = () => {
  return (
    <View style={styles.productContainer}>
      <SkeletonPlaceholder>
        <View style={styles.productImageSkeleton} />

        <View style={styles.productNameSkeleton} />
        <View style={styles.productPriceSkeleton} />

        <View style={styles.addToCartButtonSkeleton} />
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 16,
    marginHorizontal: 16,
    paddingVertical: 16,
  },
  productImageSkeleton: {
    width: '50%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#E0E0E0', // Placeholder color
    alignSelf: 'center',
  },
  productNameSkeleton: {
    width: '80%',
    height: 20,
    backgroundColor: '#E0E0E0', // Placeholder color
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'center',
    marginHorizontal: 16,
  },
  productPriceSkeleton: {
    width: '40%',
    height: 20,
    backgroundColor: '#E0E0E0', // Placeholder color
    alignSelf: 'flex-start',
    marginTop: 5,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  addToCartButtonSkeleton: {
    width: '80%',
    height: 40, // Adjusted the height to fit within the container
    backgroundColor: '#E0E0E0', // Placeholder color
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 0,
  },
});

export default ProductListSkeletonComponent;
