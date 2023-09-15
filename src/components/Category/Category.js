import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {useGetCategoriesQuery} from '../../redux/features/Category/categorySlice';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {setSelectedCategory} from '../../redux/features/Search/searchSlice';
import {
  productApi,
  updatePageNumber,
} from '../../redux/features/Product/productSlice';
import RetryComponent from '../RetryComponent';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const Category = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    isSuccess,
    data,
    isLoading,
    isFetching,
    isUninitialized,
    isError,
    error,
    refetch,
  } = useGetCategoriesQuery();

  // // Render a loading indicator while fetching data
  // if (isLoading || isFetching) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // // Render an error message if there's an error
  // if (isError) {
  //   return (
  //     <View style={styles.container}>
  //       <Text>Error: {error.message}</Text>
  //     </View>
  //   );
  // }

  const screenWidth = Dimensions.get('window').width;
  const itemWidth = screenWidth*0.421 // Calculate item width based on screen width

  const renderCategoryItem = ({item}) => {
    if (isLoading) {
      return (
        <View style={[styles.categoryItem, {width: itemWidth}]}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item
              width={100}
              height={100}
              borderRadius={50}
            />
            <SkeletonPlaceholder.Item width={100} height={20} marginTop={8} />
          </SkeletonPlaceholder>
        </View>
      );
    } else if (isError) {
      return <RetryComponent onRetryPress={() => refetch()} />;
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            dispatch(setSelectedCategory(item));
            navigation.navigate('SearchResult');
          }}>
          <View style={[styles.categoryItem, {width: itemWidth}]}>
            <Image
              source={{uri: item.image}} // Assuming 'image' is the image URL in your category data
              style={styles.categoryImage}
            />
            <Text style={styles.categoryName} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
     
      <FlatList
        data={
          isLoading
            ? [{_id: 1}, {_id: 2}, {_id: 3}, {_id: 4}, {_id: 5}]
            : isError
            ? [{_id: 1}]
            : data?.categories
        }
        keyExtractor={item => item._id}
        renderItem={renderCategoryItem}
        numColumns={2} // Display two columns
        ListHeaderComponent={ <Text style={styles.title}>Categories</Text>}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color:"black",
    margin: 8,
   
  },
  categoryItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 180, // Fixed height for each item
  },
  categoryName: {
    fontSize: 16, // Adjust font size as needed
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
    color:"black"
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50, // Make the image circular
  },

  skeletonCategoryImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  skeletonCategoryName: {
    width: 100,
    height: 20, // Adjust height to match your text size
    backgroundColor: 'lightgray', // Placeholder background color
    marginTop: 8,
  },
  skeletonCategoryItem: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    height: 180, // Fixed height for each item
  },
});
