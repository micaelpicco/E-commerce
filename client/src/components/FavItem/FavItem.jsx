import React from "react";
import Card from "../Card/Card";
import Style from "./favItem.module.css";
import buttonDelete from "../images/Delete.svg";
const FavItem = ({ img, title, price, deleteFavorite, id }) => {

  return (
    <div className={Style.artilce_FavItem}>
      <div className={Style.FavItem}>
        <Card img={img} title={title} price={price} id={id} />
      </div>
      <button
        className={Style.buttonDeleteFav}
        onClick={() => deleteFavorite(id)}
      >
        <img src={buttonDelete} alt="img not found"></img>
      </button>
    </div>
  );
};

export default FavItem;
