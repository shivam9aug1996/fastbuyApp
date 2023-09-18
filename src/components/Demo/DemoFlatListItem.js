import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'

const DemoFlatListItem = ({item,handleIncreaseValue}) => {
  console.log("rendering")
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>Item {item.id}</Text>
      <Text style={styles.itemValue}>{item.value}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleIncreaseValue(item.id)}
      >
        <Text style={styles.addButtonText}>+1</Text>
      </TouchableOpacity>
    </View>
  )
}

export default memo(DemoFlatListItem)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  itemValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 4,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
})