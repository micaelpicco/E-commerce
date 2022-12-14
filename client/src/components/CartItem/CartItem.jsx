import { Link } from "react-router-dom";
import Styles from "./CartItem.module.css";

const CartItem = ({
  id,
  name,
  price,
  quantity,
  image,
  delProductCart,
  size,
  color,
  demographic,
}) => {
  return (
    <div className={Styles.cartItem}>
      <h4 className={Styles.NameCart}>
        {name} {size} {color}
      </h4>
      <h4 className={Styles.NameCart}>{demographic}</h4>
      <Link className={Styles.imageCartContainer} to={`/home/product/${id}`}>
        <img className={Styles.imageCart} src={image} alt="img not found"></img>
      </Link>
      <h5 className={Styles.DetailCart}>
        ${price}.00 x {quantity} = ${price * quantity}.00
      </h5>
      <div className={Styles.ButtonsCart}>
        <button
          className={Styles.ButtonCart}
          onClick={() => delProductCart(id)}
        >
          Eliminar producto
        </button>
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default CartItem;
