import { createSlice } from "@reduxjs/toolkit";
import { products } from "../assets/products/products";
import * as asset from "./assets/searchAsset";

const initialState = {
  products: products.slice(0, 8),
  productsCount: products.length,
};

const productsCollectionSlice = createSlice({
  name: "productsCollectionSlice",
  initialState: initialState,
  reducers: {
    setProducts(state, action) {
      let { name, colors, brands, prices, tags, genders, sizes, page, limit } =
        action.payload.filters;

      colors = colors && colors?.length !== 0 ? colors : asset.assetColors;
      brands = brands && brands?.length !== 0 ? brands : asset.assetBrands;
      genders = genders && genders?.length !== 0 ? genders : asset.assetGenders;
      sizes = sizes && sizes?.length !== 0 ? sizes.map(Number) : asset.assetSizes;
      prices = prices && prices?.length !== 0 ? prices.map(Number) : asset.assetPrices;
      tags = tags && tags?.length !== 0 ? tags : asset.assetTags;

      const resultProducts = products.filter((product) => {
        const nameRegex = new RegExp(name, "i");
        const hasMatchingName = nameRegex.test(product.name);
        const hasMatchingColor = colors.some((color) =>
          product.variants.some((variant) => variant.color === color)
        );
        const hasMatchingBrand = brands.includes(product.brand);
        const hasMatchingPrice = product.price >= prices[0] && product.price <= prices[1];
        const hasMatchingTags = tags.some((tag) => product.tags.includes(tag));
        const hasMatchingGender = genders.includes(product.gender);
        const hasMatchingSize = product.variants.some((variant) =>
          variant.sizes.some((size) => sizes.includes(size))
        );
        return (
          hasMatchingName &&
          hasMatchingColor &&
          hasMatchingBrand &&
          hasMatchingPrice &&
          hasMatchingTags &&
          hasMatchingGender &&
          hasMatchingSize
        );
      });
      const productsCount = resultProducts?.length;
      const slicedResultProducts = resultProducts.slice((page - 1) * limit, page * limit);
      state.products = slicedResultProducts;
      state.productsCount = productsCount;
    },
    updateProductsCollectionToInitialState(state, action) {
      state.products = [];
      state.productsCount = 0;
    },
  },
});

export default productsCollectionSlice.reducer;
export const { setProducts, updateProductsCollectionToInitialState } =
  productsCollectionSlice.actions;
