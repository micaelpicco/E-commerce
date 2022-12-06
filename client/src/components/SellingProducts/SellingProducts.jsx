import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { getUserData } from "../../Utils/useLocalStorage";
import SellingCard from "../SellingCard/SellingCard";
import Styles from "./SellingProducts.module.css";

const SellingProducts = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data?.id);
      }
      axios
        .get(
          `${
            process.env.REACT_APP_API || `http://localhost:3001`
          }/user/onSell/${user}`
        )
        .then((res) => {
          console.log(res);
          setProducts(res.data);
        });
    })();
  }, [user]);

  return (
    <div>
      <h1 className={Styles.SellProductsTittle}>Productos</h1>
      {products.length ? (
        products.map((el) => (
          <SellingCard
            img={el?.image[0]}
            id={el?.id}
            name={el?.name}
            price={el?.price}
            size={el?.size}
            color={el?.color}
            isActive={el?.isActive}
            demographic={el?.demographic}
          />
        ))
      ) : (
        <label className={Styles.NoData}>Aun no tienes productos en venta.</label>
      )}
    </div>
  );
};

export default SellingProducts;
