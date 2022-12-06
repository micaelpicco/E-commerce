import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../Utils/useLocalStorage";
import { buyHistorial } from "../../redux/actions";
import HistoryCard from "../HistoryCard/HistoryCard";
import Styles from "./BuyPage.module.css";

const BuyPage = () => {
  const dispatch = useDispatch();

  const [user, setUser] = useState("");

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data?.id);
      }
    })();
    dispatch(buyHistorial(user));
  }, [user, dispatch]);

  const historial = useSelector((state) =>
    state?.historial.filter((el) => el.pagado === true)
  );

  //const historial = useSelector((state) => state?.historial);

  console.log(historial);

  var repetidos = {};

  historial?.forEach(function (numero) {
    repetidos[numero?.variantId] = (repetidos[numero?.variantId] || 0) + 1;
  });

  return (
    <div className={Styles.BuyPage}>
      <h1 className={Styles.BuyPageTittle}>Historial Compra</h1>
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
              date={el?.updatedAt.slice(0, 10)}
              status={el?.status}
              amount={repetidos[el?.variantId]}
            />
          ))
      ) : (
        <label className={Styles.NoData}>Aun no tienes compras.</label>
      )}
    </div>
  );
};

export default BuyPage;
