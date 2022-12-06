import React from "react";
import { Link } from "react-router-dom";
import { Route, Routes, useLocation } from "react-router-dom";
import SellHistory from "../SellHistory/SellHistory";
import SellingProducts from "../SellingProducts/SellingProducts";
import Styles from "./SellPage.module.css";

const SellPage = () => {
  const location = useLocation();

  console.log(location.pathname)

  return (
    <div className={Styles.Sellpage}>
      <div className={Styles.SellpageLinks}>
        <Link id={location.pathname === "/home/profile/sells" ? Styles.Selected : Styles.NotSelected} 
          className={Styles.SellPageLink} to="">VENTAS
        </Link>
        <Link id={location.pathname === "/home/profile/sells/products" ? Styles.Selected : Styles.NotSelected}
          className={Styles.SellPageLink} to="products">PRODUCTOS
        </Link>
      </div>
      <div className={Styles.SellpageRoutes}>
        <Routes>
          <Route index element={<SellHistory />} />
          <Route path="products" element={<SellingProducts />} />
        </Routes>
      </div>
    </div>
  );
};

export default SellPage;
