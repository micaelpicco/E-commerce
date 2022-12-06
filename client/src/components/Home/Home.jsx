import React from "react";
import Styles from "./Home.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { filterProducts, emptyDetail, buyHistorial } from "../../redux/actions";
import { setSession } from "../../sessionUtils/jwtSession";
import { getUserData } from "../../Utils/useLocalStorage";
import Card from "../Card/Card";
import NavBar from "../NavBar/NavBar";

import { useLocalStorage } from "../../Utils/useLocalStorage";

export default function Home() {
  const dispatch = useDispatch();
  const search = useLocation().search;
  const gtoken = new URLSearchParams(search).get('gtoken');

  const [price, setPrice] = useLocalStorage("price", "");
  const [size, setSize] = useLocalStorage("size", "");
  const [demographic, setDemographic] = useLocalStorage("demographic", "");
  const [color, setColor] = useLocalStorage("color", "");
  const [name, setName] = useLocalStorage("name", "");
  const [page, setPage] = useLocalStorage("page", 0);
  const [orderBy, setOrderBy] = useLocalStorage("orderBy", "ASC");
  const [sortBy, setSortBy] = useLocalStorage("sortBy", "name");
  const [user, setUser] = useState("");

  useEffect(() => {
    if(gtoken){
     setSession(gtoken); 
    }
    dispatch(
      filterProducts(
        name,
        price,
        size,
        demographic,
        color,
        page,
        orderBy,
        sortBy
      )
    );

    dispatch(emptyDetail());
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data);
      }
      if (user) {
        dispatch(buyHistorial(user.id));
      }
    })();
  }, [
    dispatch,
    name,
    price,
    size,
    demographic,
    color,
    page,
    orderBy,
    sortBy,
    user,
  ]);

  const allProducts = useSelector((state) => state.products);
  const results = useSelector((state) => state.productsStatus);

  //SEARCH
  const filterByName = (e) => {
    e.preventDefault();
    setPage(0);
    setName(e.target.value);
  };

  //FILTER PRICE
  const filterByPrice = (e) => {
    e.preventDefault();
    setPage(0);
    setPrice(e.target.value);
  };

  //FILTER SIZE
  const filterBySize = (e) => {
    e.preventDefault();
    setPage(0);
    setSize(e.target.value);
  };

  //FILTER DEMOGRAPHIC
  const filterByDemographic = (e) => {
    e.preventDefault();
    setPage(0);
    setDemographic(e.target.value);
  };

  //FILTER COLOR
  const filterByColor = (e) => {
    e.preventDefault();
    setPage(0);
    setColor(e.target.value);
  };

  //SORT
  const changeSort = (e) => {
    e.preventDefault();
    setPage(0);
    setSortBy(e.target.value);
  };

  //ORDER
  const changeOrder = (e) => {
    e.preventDefault();
    setPage(0);
    setOrderBy(e.target.value);
  };

  //SHOW ALL
  const handleClickShowAll = (e) => {
    e.preventDefault();
    setPage(0);
    setSortBy("name");
    setOrderBy("ASC");
    setPrice("");
    setSize("");
    setDemographic("");
    setColor("");
    setName("");
    dispatch(
      filterProducts(
        name,
        price,
        size,
        demographic,
        color,
        page,
        orderBy,
        sortBy
      )
    );
  };

  //PAGINATED
  const start = (e) => {
    e.preventDefault();
    setPage(0);
  };

  const prev = (e) => {
    e.preventDefault();
    setPage(page - 10);
  };

  const next = (e) => {
    e.preventDefault();
    setPage(page + 10);
  };

  //PAGINATED
  // const start = (e) => {
  //   e.preventDefault();
  //   setCant(0);
  // };

  // const prev = (e) => {
  //   e.preventDefault();
  //   setCant(cant - 1);
  // };

  // const next = (e) => {
  //   e.preventDefault();
  //   setCant(cant + 1);
  // };

  return (
    <div className={Styles.Home}>
      <NavBar />
      <div className={Styles.ProductsHomeContainer}>
        <div className={Styles.ProductsHome}>
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
              <option value="L">L</option>
              <option value="M">M</option>
              <option value="S">S</option>
              <option value="XXS">XXS</option>
              <option value="XXXS">XXXS</option>
            </select>
            <select
              className={Styles.FilterProductsHomeSelect}
              value={demographic}
              onChange={(e) => filterByDemographic(e)}
            >
              <option value="">Filtrar por Género</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Hombre adolescente">Hombre adolescente</option>
              <option value="Mujera adolescente">Mujer adolescente</option>
              <option value="Niño">Niño</option>
              <option value="Niña">Niña</option>
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
              className={Styles.FilterProductsHomeSelect}
              value={color}
              onChange={(e) => filterByColor(e)}
            >
              <option value="">Filtrar por Color</option>
              <option value="Amarillo">Amarillo</option>
              <option value="Azul">Azul</option>
              <option value="Blanco">Blanco</option>
              <option value="Gris">Gris</option>
              <option value="Marron">Marron</option>
              <option value="Negro">Negro</option>
              <option value="Rojo">Rojo</option>{" "}
              <option value="Rosado">Rosado</option>{" "}
              <option value="Verde">Verde</option>{" "}
            </select>

            <input
              className={Styles.FilterProductsHomeSelect}
              id={Styles.SearchBar}
              type="text"
              value={name}
              placeholder="Buscar productos..."
              onChange={(e) => filterByName(e)}
            />
            {/* <Orders setOrder={setOrder} /> */}
            <label className={Styles.OrderBy}> ORDENAR POR:</label>
            <select id={Styles.OrderBySelect} className={Styles.FilterProductsHomeSelect} name="sort" value={sortBy} onChange={(e) => changeSort(e)}>
              <option value="name">Nombre</option>
              <option value="price">Precio</option>
            </select>
            <select
              id={Styles.OrderBySelect}
              className={Styles.FilterProductsHomeSelect}
              name="order"
              value={orderBy}
              onChange={(e) => changeOrder(e)}
            >
              <option value="ASC">Ascendente</option>
              <option value="DESC">Descendente</option>
            </select>
            <button
              className={Styles.FilterProductsHomeSelect}
              onClick={(e) => {
                handleClickShowAll(e);
              }}
            >
              Mostrar todo
            </button>
          </div>

          <div className={Styles.HomePaginado}>
            <button
              className={Styles.PageButtons}
              onClick={(e) => {
                start(e);
              }}
              disabled={page <= 0}
            >
              {"Comienzo"}
            </button>
            <button
              className={Styles.PageButtons}
              value={page}
              onClick={(e) => {
                prev(e);
              }}
              disabled={page <= 0}
            >
              {"Anterior"}
            </button>
            <button className={Styles.PageButtons}>{page / 10}</button>
            <button
              className={Styles.PageButtons}
              onClick={(e) => {
                next(e);
              }}
              disabled={allProducts.length < 10}
            >
              {"Siguiente"}
            </button>
          </div>

          <div className={Styles.ProductsHomeProductsCard}>
            {allProducts.length ? (
              allProducts.map((p) => (
                <Card
                  key={p.id}
                  id={p.id}
                  img={p.image}
                  title={p.name[0].toUpperCase() + p.name.substring(1)}
                  price={p.price}
                />
              ))
            ) : (
              <div>
                <p>{results}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
