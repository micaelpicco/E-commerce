import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  deactivateProduct,
  emptyDetail,
  activateProduct,
} from "../../redux/actions";
import Styles from "./SellingCard.module.css";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { useState } from "react";

const SellingCard = ({
  img,
  name,
  price,
  id,
  size,
  color,
  demographic,
  isActive,
}) => {
  const dispatch = useDispatch();
  const [isAct, setAct] = useState(isActive);
  const toast = (text, color = "#32CD32") =>
    Toastify({
      text: text,
      duration: 1500,
      position: "center",
      className: Styles.toast,
      backgroundColor: color,
    }).showToast();

  useEffect(() => {
    dispatch(emptyDetail());
  }, [dispatch]);

  const handleDesactivate = () => {
    dispatch(deactivateProduct(id)).then(
      toast("Producto desactivado", "yellow")
    );
    setAct(false);
  };

  const handleActivate = () => {
    dispatch(activateProduct(id)).then(toast("Producto activado"));
    setAct(true);
  };

  return (
    <div className={Styles.SellingCardDiv}>
      <Link className={Styles.SellingCard} to={`/Home/Product/${id}`}>
        <div>
          <img
            className={Styles.SellingCardImg}
            src={img}
            alt="img not found"
          />
        </div>
        <div className={Styles.SellingCardText}>
          <h3 className={Styles.SellingCardName}>
            {name[0].toUpperCase() + name.substring(1)} {size} {color}
          </h3>
          <p className={Styles.SellingCardData}>
            Precio: ${price} Demografia: {demographic}
          </p>
        </div>
      </Link>
      <Link to={`/home/editProduct/${id}`}>
        <button className={Styles.BackButtons}>Modificar</button>
      </Link>
      {isAct ? (
        <button
          className={Styles.BackButtons}
          onClick={() => handleDesactivate()}
        >
          Desactivar
        </button>
      ) : (
        <button className={Styles.BackButtons} onClick={() => handleActivate()}>
          Activar
        </button>
      )}
    </div>
  );
};

export default SellingCard;
