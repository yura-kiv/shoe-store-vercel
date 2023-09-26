import { combineReducers } from "@reduxjs/toolkit";
import productsCollectionSlice from "./productsCollectionSlice";
import filtersSlice from "./filtersSlice";
import cartSlice from "./cartSlice";
import userAuthSlice from "./userAuthSlice";

export const rootReducer = combineReducers({
  filtersSlice,
  productsCollectionSlice,
  cartSlice,
  userAuthSlice,
});
