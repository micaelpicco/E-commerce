import React from "react";
import { Link } from "react-router-dom";
import CardStyles from "./Card.module.css";

const Card = ({ img, title, price, id }) => {
  return (
    <div className={CardStyles.CardProductHome}>
      <Link
        className={CardStyles.CardProductHomeLink}
        to={`/Home/Product/${id}`}
      >
        <div className={CardStyles.CardProductHomeLinkImgContainer}>
          <img
            className={CardStyles.CardProductHomeLinkProductImg}
            src={img}
            alt="img not found"
          />
        </div>
        <div className={CardStyles.CardProductHomeLinkProductTextContainer}>
          <h3 className={CardStyles.CardProductHomeProductTitle}>{title}</h3>
          <h3 className={CardStyles.CardProductHomeProductPrice}>${price}</h3>
        </div>
      </Link>
    </div>
  );
};

export default Card;
