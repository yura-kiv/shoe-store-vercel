import React, { useEffect } from "react";
import Product from "../Product/Product";
import styles from "./ProductsTable.module.scss";
import ProductSkeleton from "../ProductSkeleton/ProductSkeleton";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import {
  changeFiltersToInitialState,
  changeGenders,
  changePage,
} from "../../toolkitRedux/filtersSlice";
import Pagination from "../Pagination/Pagination";
import { useMatchMedia } from "../../hooks/useMatchMedia";
import {
  setProducts,
  updateProductsCollectionToInitialState,
} from "../../toolkitRedux/productsCollectionSlice";

const ProductsTable = () => {
  const { screen769_plus } = useMatchMedia();
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const { products } = useSelector((state) => state.productsCollectionSlice);

  useEffect(() => {
    const gender = params.type === "all" ? null : params.type === "men" ? "male" : "female";
    gender
      ? dispatch(setProducts({ filters: { genders: [gender], page: 1, limit: 8 } }))
      : dispatch(setProducts({ filters: { genders: gender, page: 1, limit: 8 } }));
    dispatch(changeFiltersToInitialState());
    dispatch(changeGenders(gender));
    dispatch(changePage(1));
    return () => {
      dispatch(updateProductsCollectionToInitialState());
    };
  }, [location]);

  return (
    <div className={styles.productsTable}>
      {products && products.length !== 0 ? (
        <>
          {products.map((product) => {
            return (
              <Product
                key={product.code}
                product={product}
              />
            );
          })}
          <Pagination />
        </>
      ) : (
        <span className="w-full h-full block text-xl font-bold text-center mt-5">
          Products not found...
        </span>
      )}
    </div>
  );
};

export default ProductsTable;
