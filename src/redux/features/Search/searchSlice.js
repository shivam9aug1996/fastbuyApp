import {createSlice} from '@reduxjs/toolkit';
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const searchApi = createApi({
  reducerPath: 'searchApi',
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
  // refetchOnMountOrArgChange:true,
  tagTypes: ['search'],
  endpoints: builder => ({
    getSuggestions: builder.query({
      query: data => ({
        url: `/suggestions?search_keyword=${data}`,
        method: 'GET',
      }),
      providesTags: ['search'],
      // keepUnusedDataFor:600,
    }),
  }),
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    debouncedText: '',
    selectedCategory:{
      name:"",
      _id:null
    },
    selectedText:""
  },
  reducers: {
    setDebouncedText: (state, action) => {
      state.debouncedText = action.payload;
    },
    setSelectedText: (state, action) => {
      state.selectedText = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: builder => {},
});


export const {   setDebouncedText,setSelectedCategory,setSelectedText } = searchSlice.actions;

export const {useGetSuggestionsQuery} = searchApi;

export default searchSlice.reducer;
