// import store from "@/redux/store";
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

import {useSelector} from 'react-redux';

import {createSlice} from '@reduxjs/toolkit';
import {Alert} from 'react-native';

// Merge function
const mergeProducts = (existingData, newData) => {
  if (!newData) {
    // No new data to merge, return existing data
    return existingData;
  }

  if (!existingData) {
    // No existing data, use the new data
    return newData.productList || [];
  }

  // Merge the new productList into the existing data
  const mergedData = {
    ...existingData,
    productList: [...existingData.productList, ...newData.productList],
    pagination: newData?.pagination,
  };

  return mergedData;
};

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://redux-next-2.vercel.app/api',
    prepareHeaders: (headers, {getState}) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  refetchOnReconnect: true,
  //  keepUnusedDataFor:10,
  tagTypes: ['products'],
  endpoints: builder => ({
    getProducts: builder.query({
      query: data => {
        console.log('Params87654:', `/products?page=${data[1]?.page}&search_keyword=${data[1]?.search_keyword}&category_id=${data[1]?.category_id?data[1]?.category_id:""}`);
        return {
          url: `/products?page=${data[1]?.page}&search_keyword=${data[1]?.search_keyword}&category_id=${data[1]?.category_id?data[1]?.category_id:""}`,
          method: 'GET',
          // params: {
          //   page: data[1]?.page,
          //   search_keyword:data[1]?.search_keyword,
          //   category_id:data[1]?.category_id
          // },
        };
      },
      // async onCacheEntryAdded(arg, {dispatch, cacheEntryRemoved}) {
      //   cacheEntryRemoved.then(() => {
      //     //Alert.alert("hi")
      //     dispatch(updatePageNumber(1));
      //     dispatch(resetProductList());
      //   });

      // //   // `onStart` side-effect
      // //   //  dispatch(messageCreated('Fetching post...',getCacheEntry()))
      //  },

      // // // Only have one cache entry because the arg always maps to one string
      // serializeQueryArgs: ({endpointName}) => {
      //   return endpointName;
      // },
      // // Always merge incoming data to the cache entry
      // merge: mergeProducts,
      // // Refetch when the page arg changes
      // forceRefetch({currentArg, previousArg}) {
      //   console.log('jy5456oiuygfdfghjk', currentArg, previousArg);
      //   return currentArg?.[1]?.page !== previousArg?.[1]?.page;
      // },

      // keepUnusedDataFor:10,
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg
      // },
      // forceRefetch({ currentArg, previousArg,state,endpointState }) {
      //   console.log(currentArg,previousArg)
      //   return currentArg !== previousArg
      // },
      providesTags: ['products'],

      //keepUnusedDataFor:600
    }),
    deleteProduct: builder.mutation({
      query: data => ({
        url: `/products?productId=${data?.productId}`,
        method: 'DELETE',
      }),
    }),
    createProduct: builder.mutation({
      query: data => {
        //console.log("98765refghjk", store?.getState()?.auth?.token);
        return {
          url: `/products`,
          method: 'POST',
          body: data?.body,
          // headers: {
          //   Authorization: `Bearer ${store?.getState()?.auth?.token}`,
          // },
        };
      },
    }),
    updateProduct: builder.mutation({
      query: data => {
        //console.log("98765refghjk", store?.getState()?.auth?.token);
        return {
          url: `/products`,
          method: 'PUT',
          body: data?.body,
          // headers: {
          //   Authorization: `Bearer ${store?.getState()?.auth?.token}`,
          // },
        };
      },
    }),
  }),
});

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    productList: [],
    pageNumber: 1,
    paginationData: null,
  },
  reducers: {
    setProductList: (state, action) => {
      state.productList = action.payload;
    },
    updateProducts: (state, action) => {
      console.log('kjhgrer5678i9o', action.payload);
      //  state.productList = action.payload
    },
    updatePageNumber: (state, action) => {
      if (action?.payload) {
        state.pageNumber = 1;
      } else {
        state.pageNumber = parseInt(state.pageNumber) + 1;
      }
    },
    resetProductList: (state, action) => {
      console.log('kjhgrer5678i9o', action.payload);
      state.productList = [];
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      productApi.endpoints.getProducts.matchFulfilled,
      (state, action) => {
        console.log("jhgfdsdfghjkl")
        let arr1;
        arr1 = state.productList || [];
        if (action?.meta?.arg?.originalArgs?.[1]?.page == 1) {
          arr1 = [];
        }
        let arr2 = action.payload?.productList || [];
        const uniqueItems = {};

        for (const item of arr1) {
          uniqueItems[item._id] = item;
        }

        for (const item of arr2) {
          uniqueItems[item._id] = item;
        }

        const mergedArray = Object.values(uniqueItems);

        console.log(mergedArray);
        state.productList = mergedArray;
      },
    );
    builder.addMatcher(
      productApi.endpoints.deleteProduct.matchFulfilled,
      (state, action) => {
        console.log('ngfwertyuio', action.payload);
        let modifiedData = state.productList.filter(item => {
          return item?._id !== action?.payload?.data?._id;
        });
        state.productList = modifiedData;
      },
    );
    builder.addMatcher(
      productApi.endpoints.createProduct.matchFulfilled,
      (state, action) => {
        console.log('ngfwertyuio', action.payload);
        // let modifiedData = state.productList.filter((item) => {
        //   return item?._id !== action?.payload?.data?._id;
        // });
        if (action?.payload?.data?._id) {
          state.productList.unshift({...action?.payload?.data});
        }
      },
    );
    builder.addMatcher(
      productApi.endpoints.updateProduct.matchFulfilled,
      (state, action) => {
        console.log('ngfwertyuio', action.payload);
        let modifiedData = state.productList.map(item => {
          if (item?._id == action?.payload?.data?._id) {
            return {...item, ...action?.payload?.data};
          } else {
            return item;
          }
        });
        state.productList = modifiedData;
        // if(action?.payload?.data?._id){
        //   state.productList.unshift({...action?.payload?.data})
        // }
      },
    );
  },
});

export const {setProductList, updatePageNumber, resetProductList} =
  productSlice.actions;

export const {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
} = productApi;

export default productSlice.reducer;
