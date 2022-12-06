import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../Utils/useLocalStorage";
import { getSellsHistory } from "../../redux/actions";
import HistoryCard from "../HistoryCard/HistoryCard";
import Styles from "./SellHistory.module.css";

const SellHistory = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(user?.id);
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data?.id);
      }
    })();

    dispatch(getSellsHistory(user));
  }, [user, dispatch]);

  const historial = useSelector((state) =>
    state?.sellsHistory.filter((el) => el.pagado === true)
  );

  var repetidos = {};

  historial.forEach(function (numero) {
    repetidos[numero.variantId] = (repetidos[numero.variantId] || 0) + 1;
  });

  return (
    <div>
      <h1 className={Styles.SellHistoryTittle}>Ventas</h1>
      {historial.length ? (
        historial
          ?.reduce((arr, el) => {
            if (!arr.find((d) => d?.variantId === el?.variantId)) {
              arr.push(el);
            }
            return arr;
          }, [])
          .map((el) => (
            <HistoryCard
              id={el?.productoId}
              name={el?.name}
              price={el?.price}
              size={el?.size}
              color={el?.color}
              demographic={el?.demographic}
              date={el?.updatedAt?.slice(0, 10)}
              status={el?.status}
              amount={repetidos[el?.variantId]}
            />
          ))
      ) : (
        <label className={Styles.NoData}>Aun no tienes ventas.</label>
      )}
    </div>
  );
};

export default SellHistory;
