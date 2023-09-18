import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import DemoFlatListItem from './DemoFlatListItem';

const DemoFlatList = () => {
  const [data, setData] = useState(
    Array.from({ length: 100 }, (_, index) => ({ id: index.toString(), value: 0 }))
  );

  const renderItem = ({ item }) => {
    //console.log("rendering")
    return (
      <DemoFlatListItem item={item} handleIncreaseValue={handleIncreaseValue}/>
    // <View style={styles.itemContainer}>
    //   <Text style={styles.itemText}>Item {item.id}</Text>
    //   <Text style={styles.itemValue}>{item.value}</Text>
    //   <TouchableOpacity
    //     style={styles.addButton}
    //     onPress={() => handleIncreaseValue(item.id)}
    //   >
    //     <Text style={styles.addButtonText}>+1</Text>
    //   </TouchableOpacity>
    // </View>
  )
  };

  const handleIncreaseValue = useCallback((itemId) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.id === itemId ? { ...item, value: item.value + 1 } : item
      )
    );
  },[])

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

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
});

export default DemoFlatList;
