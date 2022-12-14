import React from "react";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import Styles from "./LandingHome.module.css";

export default function LandingHome() {
  return (
    <div>
      <div className={Styles.BackgroundImage}></div>
      <div className={Styles.LandingContainer}>
        <h1 className={Styles.LandingTitle}>Bienvenido a Express Clothes</h1>
        <h4 className={Styles.LandingSubTitle}>
          Compra o aumenta tus ventas de ropa
        </h4>
        <div className={Styles.LandingButtons}>
          <Link to="/home">
            <button className={Styles.LandingButton}>Buscar productos</button>
          </Link>
          <Link to="/register">
            <button className={Styles.LandingButton}>Crear una tienda</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
}
