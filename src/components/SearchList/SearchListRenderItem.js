import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'; 

const SearchListRenderItem = ({item,handlePress}) => {
  console.log("uytrdfghjk")
  return (
    <TouchableOpacity
        style={styles.item}
        onPress={() => {
          handlePress(item)
         
        }}>
        <Text style={styles.text}>{item?.name}</Text>
        <Icon name="long-arrow-right" size={20} color="#007AFF" />
      </TouchableOpacity>
  )
}

export default memo(SearchListRenderItem)

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: 'white',
    marginHorizontal: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    height: 1, // Height of the separator line
    backgroundColor: '#ccc', // Color of the separator line
    marginHorizontal:10
  },
  text: {
    maxWidth: 250,
    color:"black"
  },
})