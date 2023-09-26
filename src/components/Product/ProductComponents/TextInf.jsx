import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./styles/TextInf.module.scss";

const TextInf = ({ code, name, brand, gender, price, activeColor }) => {
  const params = useParams();
  return (
    <div className={styles.textInfoWrapper}>
      <Link
        to={`/shoes/${params.type}/${code}/${activeColor}/`}
        className={styles.textInfoHeader}
      >
        {name}
      </Link>

      <span className={styles.textInfoBrand}>{brand}</span>
      <span className={styles.textInfoGender}>{gender === "male" ? "Men" : "Woman"}</span>
      <span className={styles.textInfoPrice}>${price}</span>
    </div>
  );
};

export default TextInf;
