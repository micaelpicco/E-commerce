import React, { useEffect, useState } from "react";
import {
  getProducts,
  getSellsHistoryStadistics,
} from "../../redux/actions/index.js";
import { getUserData } from "../../Utils/useLocalStorage.js";
import { validateUser } from "../../sessionUtils/jwtSession.js";
import { useDispatch, useSelector } from "react-redux";
import SellsGraphic from "../SellsGraphic/SellsGraphic.jsx";
import Styles from "./Stadistics.module.css";

const Stadistics = () => {
  const dispatch = useDispatch();
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
    if (user !== null) {
      dispatch(getSellsHistoryStadistics(id));
    }
    dispatch(getProducts());
  }, [dispatch, user]);

  const historial = useSelector((state) => state?.sellsHistory);
  const sellsHistory = useSelector((state) => state.sellsStadistics);

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

  const sellsInProcess = () => {
    let auxSells = [];
    const auxNum = parseInt(daysMonth().pop());
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
      <h1 align="center">Panel de Control</h1>
      <div>
        {sellsHistory.length ? (
          <SellsGraphic days={days} sells={sellsForDays()} />
        ) : (
          <SellsGraphic days={days} sells={sellsInProcess()} />
        )}

        <h2 align="center">Mes actual: {Date()?.split(" ")[1]}</h2>
        <br></br>
        <br></br>

        <h2 className={Styles.total} align="center">
          CANTIDAD TOTAL DE PRODUCTOS VENDIDOS DURANTE EL MES{" "}
          <h1 className={Styles.cantidad}>{historial.length}</h1>
          CANTIDAD TOTAL DE DINERO GENERADO DURANTE EL MES{" "}
          <h1 className={Styles.cantidad}>
            {" "}
            {historial.length
              ? historial?.reduce((arr, el) => arr + el.price, 0)
              : "0"}
            $
          </h1>
        </h2>
      </div>
    </div>
  );
};

export default Stadistics;
