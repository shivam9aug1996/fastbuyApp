import {FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {lazy, useCallback, useState} from 'react';
import {
  orderApi,
  useGetOrderListQuery,
} from '../redux/features/Order/orderSlice';
import {useDispatch, useSelector} from 'react-redux';
import OrderListSkeletonComponent from '../components/OrderListSkeletonComponent';


import withAuth from '../components/withAuth';
import { useNavigation } from '@react-navigation/native';
import { getErrorText } from '../utils/globalFunctions';
// import Toast from '../components/Toast';
const Toast = lazy(() => import('../components/Toast'));


const Order = () => {
  const userId = useSelector(state => state?.auth?.userData?.id);
  const orderData = useSelector(state => state?.order?.orderList || []);
  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading, data, isSuccess, isError, error} = useGetOrderListQuery({
    param: userId,
  });
  console.log('876rdfghj', data);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    dispatch(orderApi.util.resetApiState());

    setRefreshing(false);
  }, []);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const options = {
      dateStyle: 'long',
      timeStyle: 'medium',
    };

    const formattedDate = date.toLocaleString(undefined, options);
    return formattedDate;
  };

  const calculateTotalItems = items => {
    let totalItems = 0;

    items.forEach(item => {
      totalItems += item.quantity;
    });

    return totalItems;
  };

  const getTotalPrice = items => {
    let total = 0;
    items.forEach(item => {
      total += item.quantity * item.price;
    });
    return total.toFixed(2);
  };

  const renderItem = ({item}) => {
    if (isLoading) {
      return <OrderListSkeletonComponent />;
    } else {
      return (
        <View style={styles.orderItem}>
          <View style={styles.orderInfo}>
            <Text style={styles.orderInfoText}>Order ID: {item?.orderId}</Text>
            <Text style={styles.orderInfoText}>
              Order Date: {formatDate(item?.date)}
            </Text>
            <Text style={styles.orderInfoText}>
              Total Items: {calculateTotalItems(item?.items)}
            </Text>
            <Text style={styles.orderInfoText}>
              Total Price: &#8377;{getTotalPrice(item?.items)}
            </Text>
          </View>
        </View>
      );
    }
  };

  const renderEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No orders found</Text>
      <Text style={styles.emptySubText}>Start shopping to see your order history.</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')} // Replace 'ProductList' with the screen you want to navigate to
        style={styles.emptyButton}
      >
        <Text style={styles.emptyButtonText}>Start Shopping</Text>
      </TouchableOpacity>
    </View>
    );
  };

  return (
    <View style={styles.container}>
       {isError && (
        <Toast visible={true} message={getErrorText(error)} type={'error'} />
      )}
      <FlatList
       ListEmptyComponent={renderEmptyComponent}
        data={
          !isLoading
            ? orderData
            : [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}]
        }
        keyExtractor={item => item._id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

export default withAuth(Order);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  orderItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
    padding: 16,
    elevation: 3,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  orderInfo: {
    marginLeft: 8,
  },
  orderInfoText: {
    fontSize: 16,
    marginBottom: 8,
    color:"black"
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptySubText: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 24,
    textAlign: 'center',
  },
  emptyButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  emptyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
