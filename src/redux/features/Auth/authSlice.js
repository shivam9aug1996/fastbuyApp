import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createSlice } from "@reduxjs/toolkit";

import { setCart } from "../Cart/cartSlice";
import { storage } from "../../../utils/mmkv";
import { Alert } from "react-native";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://redux-next-2.vercel.app/api/auth",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (userData) => ({
        url: "/signup",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: "/login",
        method: "POST",
        body: userData,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
        body:{}
      }),
    }),
    googleAuth: builder.mutation({
      query: (data) => ({
        url: "/google-login",
        method: "POST",
        body: data,
      }),
    }),
    verifyRecaptcha: builder.mutation({
      query: (data) => ({
        url: "/verify-recaptcha",
        method: "POST",
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/profile",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: "",
    userData: null,
  },
  reducers: {
    setAppStart: (state, action) => {
      console.log("jhgfdfghjk",storage.getString("token"))
      if (storage.getString("token")) {
        console.log("jhgfdfghjk",storage.getString("token"))
        state.token = storage.getString("token");
      } else if (!storage.getString("token")) {
        state.token = undefined;
      }

      if (storage.getString("userData")) {
        state.userData = JSON.parse(storage.getString("userData"));
      } else if (!storage.getString("userData")) {
        state.userData = undefined;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.signup.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
        let token = action.payload?.token || "";
        storage.set("token",token);
        storage.set("userData", JSON.stringify(action?.payload));
        state.token = token;
        state.userData = action?.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, action) => {
        console.log("jytfghji876",action.payload?.token );
        let token = action.payload?.token || "";
        storage.set("token",token);
      console.log("76esdfghj", storage.getString("token"))
        storage.set("userData", JSON.stringify(action?.payload));
        state.token = token;
        state.userData = action?.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.logout.matchFulfilled,
      (state, action) => {
       // Alert.alert("jht5")
        storage.delete("token");
        storage.delete("userData");
        state.token = undefined;
        state.userData = undefined;
      }
    );
    builder.addMatcher(
      authApi.endpoints.googleAuth.matchFulfilled,
      (state, action) => {
        let token = action.payload?.token || "";
        storage.set("token",token);
        storage.set("userData", JSON.stringify(action?.payload));
        state.token = token;
        state.userData = action?.payload;
      }
    );
    builder.addMatcher(
      authApi.endpoints.updateProfile.matchFulfilled,
      (state, action) => {
        let data;
        if (action.meta.arg.originalArgs) {
          console.log("mjhgre67890uyg", action.meta.arg.originalArgs);
          data = JSON.parse(action.meta.arg.originalArgs);
        }
        const { name, modifiedAddresses, newAddress, addressToDeleteId } = data;
        console.log("jhyt56789", JSON.parse(action.meta.arg.originalArgs));
        console.log("765efghjytrdfgh", newAddress, name, action.payload);
        const { addressId } = action?.payload;
        if (name) {
          storage.set(
            "userData",
            JSON.stringify({ ...state.userData, name })
          );
          state.userData = { ...state.userData, name };
        }
        if (newAddress) {
          console.log("jhgre4567890", newAddress);
          storage.set(
            "userData",
            JSON.stringify({
              ...state.userData,
              addresses: [
                { ...newAddress, addressId },
                ...state?.userData?.addresses,
              ],
            })
          );
          state.userData = {
            ...state.userData,
            addresses: [
              { ...newAddress, addressId },
              ...state?.userData?.addresses,
            ],
          };
        }
        if (addressToDeleteId) {
          let modifiedData = state?.userData?.addresses?.filter((item) => {
            return item?.addressId !== addressToDeleteId;
          });
          storage.set(
            "userData",
            JSON.stringify({ ...state.userData, addresses:modifiedData })
          );
          state.userData = { ...state.userData, addresses:modifiedData };
        }
        if(modifiedAddresses){
         let modifiedData=state?.userData?.addresses?.map((item) => {
             if(item?.addressId == modifiedAddresses?.addressId){
             
              return modifiedAddresses
             }else return item
          });
          storage.set(
            "userData",
            JSON.stringify({ ...state.userData, addresses:modifiedData })
          );
          state.userData = { ...state.userData, addresses:modifiedData };
        }
      }
    );
  },
});

export const {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGoogleAuthMutation,
  useVerifyRecaptchaMutation,
  useUpdateProfileMutation,
} = authApi;
export const { setAppStart, logout } = authSlice.actions;

export default authSlice.reducer;
