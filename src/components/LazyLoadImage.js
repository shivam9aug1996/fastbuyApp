import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const LazyLoadImage = ({viewableItems,item}) => {

  return (
    <View>
      {viewableItems?.current?.some(vItem => vItem?.item?._id === item?._id) ? (
        <Image source={{uri: item?.image}} style={styles.productImage} />
      ) : (
        <View style={{width:20,height:20,backgroundColor:"red"}}/>
      )}
    </View>
  );
};

export default LazyLoadImage;

const styles = StyleSheet.create({
  productImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    objectFit: 'contain',
    marginTop:16
  },
});
