import React, { useEffect, useState } from "react";
import {
  getProducts,
  getSellsHistoryStadistics,
} from "../../redux/actions/index.js";
import { getUserData } from "../../Utils/useLocalStorage.js";
import { validateUser } from "../../sessionUtils/jwtSession.js";
import { useDispatch, useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx";
import SellsGraphic from "../SellsGraphic/SellsGraphic.jsx";
import Styles from "./Stadistics.module.css";

const Stadistics = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data?.id);
      }
    })();
    const token = validateUser();
    const id = user;
    console.log(token);
    console.log(id);
    if (user !== null) {
      dispatch(getSellsHistoryStadistics(id));
    }
    dispatch(getProducts());
  }, [dispatch, user]);

  const sellsHistory = useSelector((state) => state.sellsStadistics);
  console.log(sellsHistory);
  const products = useSelector((state) => state.products);

  const listNumbers = (num) => {
    let numbers = [];
    for (let i = 1; i <= num; i++) {
      numbers.push(i.toString());
    }
    return numbers;
  };

  const daysMonth = () => {
    const thisMonth = Date()?.split(" ")[1];
    const thirtyDays = ["Abr", "Jun", "Sep", "Nov"];
    const thirtyOneDays = ["Jan", "Mar", "May", "Jul", "Aug", "Oct", "Dec"];
    let daysOfThisMonth = [];
    if (thirtyDays.includes(thisMonth)) {
      daysOfThisMonth = listNumbers(30);
    } else if (thirtyOneDays.includes(thisMonth)) {
      daysOfThisMonth = listNumbers(31);
    } else {
      daysOfThisMonth = listNumbers(28);
    }
    return daysOfThisMonth;
  };

  const sellsForDays = () => {
    const today = new Date();
    const thisMonth = today.getMonth() + 1;
    const thisYear = today.getFullYear();
    const daysOfMonth = parseInt(daysMonth().pop());
    let sellsDays = [];
    let day = 0;
    if (sellsHistory.length) {
      for (let i = 1; i <= daysOfMonth; i++) {
        let amount = 0;
        if (i < 10) {
          day = `0${i}`;
        } else {
          day = i;
        }
        sellsHistory.forEach((sell) => {
          if (sell.date === `${thisYear}-${thisMonth}-${day}`) {
            amount++;
          }
        });
        sellsDays.push(amount.toString());
      }
    }
    return sellsDays;
  };

  /* const randomSells = () => {
        let randomSell = Math.floor(Math.random() * 10)
        return randomSell
    } */

  const sellsInProcess = () => {
    let auxSells = [];
    const auxNum = parseInt(daysMonth().pop()); //ultimo día del mes (osea, la cantidad de días)
    for (let i = 1; i <= auxNum; i++) {
      auxSells.push("0");
    }
    return auxSells;
  };

  const mostSellProducts = () => {
    if (!sellsHistory.length) return [];
    let products = [];
    sellsHistory.forEach((sell) => {
      let product = products.find((s) => s.productId === sell.productId);
      if (!product) {
        products.push({ productId: sell.productId, amount: 1 });
      } else {
        let num = product.amount + 1;
        product.amount = num;
      }
    });
    const orderedSells = products.sort((a, b) => {
      return b.amount - a.amount;
    });
    if (orderedSells.length <= 5) {
      return orderedSells;
    }
    return orderedSells.slice(0, 5);
  };

  const mostSelledProducts = mostSellProducts();
  const days = daysMonth();

  return (
    <div className={Styles.StadisticsComponent}>
      {/* <button
             className={Style.backButton} 
            onClick={() => navigate("/home")}
          >
            Atrás
          </button> */}
      <h1>Panel de Control</h1>
      <div>
        {sellsHistory.length ? (
          <SellsGraphic days={days} sells={sellsForDays()} />
        ) : (
          <SellsGraphic days={days} sells={sellsInProcess()} />
        )}
        {sellsHistory.length ? (
          sellsHistory.map((sell) => {
            const productInfo = products.find((p) => p.id === sell.productId);
            return (
              <div>
                {/* <img src={productInfo?.image[0]} alt="foto" /> */}
                <h4>{productInfo?.name}</h4>
                {/* <p>{sell.buyer || "Nombre del comprador"}</p> */}
                <p>Talle: {sell?.size}</p>
                <p>{sell?.location}</p>
                {/* <Link to={`/sell/${sell.id}`}>
                                    <p>Más detalles de la compra</p>
                                </Link> */}
              </div>
            );
          })
        ) : (
          <h2>Aquí van a aparecer las ventas que hayas realizado</h2>
        )}
        <div>
          <h2>Productos más vendidos</h2>
          {mostSelledProducts.length ? (
            mostSelledProducts.map((s) => {
              const productInfo = products.find((p) => p.id === s.productId);
              return (
                <div>
                  <h2>{productInfo?.name}</h2>
                  {/* <img src={productInfo?.image[0]} alt="foto" /> */}
                  <h2>Vendidos:</h2>
                  <h2>{s.amount}</h2>
                </div>
              );
            })
          ) : (
            <div>Aquí se mostraran tus productos más vendidos</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Stadistics;
