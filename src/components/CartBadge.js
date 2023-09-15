import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { IconButton, Badge } from 'react-native-paper';
import { useSelector } from 'react-redux';

const CartBadge = () => {
  const cartData = useSelector((state) => state?.cart?.cart || []);
  const navigation = useNavigation()


  return (
    <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={()=>{
     // navigation.navigate('Main', { screen: 'Cart' });
     navigation.push('Cart');


    }}>
      <IconButton
        icon="cart"
        color="rgba(40, 116, 240, 1)"
        size={25}
        onPress={() => {
         // navigation.navigate('Main', { screen: 'Cart' });
         navigation.push('Cart');
          // Add your navigation logic for the shopping cart screen here
        }}
      />
      {cartData.length > 0 && (
        <Badge
          size={20}
          style={{
            position: 'absolute',
            top: 5,
            right: 5,
            color:"white",
            backgroundColor:"red",
            fontSize:13
          }}
        >
          {cartData.length}
        </Badge>
      )}
    </Pressable>
  );
};

export default CartBadge;
