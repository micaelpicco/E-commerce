import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProducts } from "../../redux/actions";
import Styles from "./Filters.module.css";

const Filters = () => {
  const dispatch = useDispatch();

  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [demographic, setDemographic] = useState("");
  const [color, setColor] = useState("");
  const [name, setName] = useState("");

  //const [cant, setCant] = useState("");

  useEffect(() => {
    dispatch(filterProducts(name, price, size, demographic, color));
  }, [dispatch, name, price, size, demographic, color]);

  //SEARCH
  const filterByName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  //FILTER PRICE
  const filterByPrice = (e) => {
    e.preventDefault();
    setPrice(e.target.value);
  };

  //FILTER SIZE
  const filterBySize = (e) => {
    e.preventDefault();
    setSize(e.target.value);
  };

  //FILTER DEMOGRAPHIC
  const filterByDemographic = (e) => {
    e.preventDefault();
    setDemographic(e.target.value);
  };

  //FILTER COLOR
  const filterByColor = (e) => {
    e.preventDefault();
    setColor(e.target.value);
  };

  //SHOW ALL
  const handleClickShowAll = (e) => {
    e.preventDefault();
    setPrice("");
    setSize("");
    setDemographic("");
    setColor("");
    setName("");
    dispatch(filterProducts(name, price, size, demographic, color));
  };

  return (
    <div className={Styles.FilterProductsHome}>
      <select
        className={Styles.FilterProductsHomeSelect}
        value={size}
        onChange={(e) => filterBySize(e)}
      >
        <option value="">Filtrar por Talle</option>
        <option value="XXXL">XXXL</option>
        <option value="XXL">XXL</option>
        <option value="XL">XL</option>
        <option value="S">S</option>
        <option value="M">M</option>
        <option value="L">L</option>
        <option value="XXS">XXS</option>
        <option value="XXXS">XXXS</option>
      </select>

      <select
        className={Styles.FilterProductsHomeSelect}
        value={demographic}
        onChange={(e) => filterByDemographic(e)}
      >
        <option value="">Filtrar por Género</option>
        <option value="adult male">Hombre</option>
        <option value="adult female">Mujer</option>
        <option value="teen male">Hombre adolescente</option>
        <option value="teen female">Mujer adolescente</option>
        <option value="little boy">Niño</option>
        <option value="little girl">Niña</option>
      </select>

      <select
        className={Styles.FilterProductsHomeSelect}
        value={price}
        onChange={(e) => filterByPrice(e)}
      >
        <option value="">Filtrar por Precio</option>
        <option value="25">hasta 25$</option>
        <option value="50">hasta 50$</option>
        <option value="75">hasta 75$</option>
        <option value="100">hasta 100$</option>
      </select>

      <select
        className="FilterProductsHomeSelect"
        value={color}
        onChange={(e) => filterByColor(e)}
      >
        <option value="">Filtrar por Color</option>
        <option value="Gris">Gris</option>
        <option value="Negro">Negro</option>
        <option value="Blanco">Blanco</option>
        <option value="Azul">Azul</option>
        <option value="Amarillo">Amarillo</option>
      </select>

      <input
        class="FilterProductsHomeSelect"
        id="text"
        type="text"
        value={name}
        placeholder="Buscar productos..."
        onChange={(e) => filterByName(e)}
      />

      <button
        class="FilterProductsHomeSelect"
        onClick={(e) => {
          handleClickShowAll(e);
        }}
      >
        Mostrar todo
      </button>
    </div>
  );
};

export default Filters;
