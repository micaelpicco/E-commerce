import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getUserData } from "../../Utils/useLocalStorage";
import Logo from "../images/bitmap2.png";
import {
  getProductDetail,
  addToCart,
  getProductDetailReviews,
  addToFavorites,
  deleteFavorite,
  buyHistorial,
  clearActions,
  deactivateProduct,
} from "../../redux/actions";
import Style from "./ProductDetail.module.css";
import Comments from "../Comments/Comments";
import buttonCart from "../images/cart.svg";
import buttonFav from "../images/buttonFav.svg";
import buttonDeleteFav from "../images/buttonDeleteFav.svg";
import buttonDelete from "../images/Delete.svg";
import CreateReview from "../CreateReviews/CreateReview";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";
import { validateUser } from "../../sessionUtils/jwtSession";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  const navigate = useNavigate();
  const toast = (text, color = "#32CD32") =>
    Toastify({
      text: text,
      duration: 1500,
      position: "center",
      className: Style.toast,
      backgroundColor: color,
    }).showToast();

  const detail = useSelector((state) => state.productDetail);
  const reviews = useSelector((state) => state.productReviews);
  const favorites = useSelector((state) => state.favorites);
  const historial = useSelector((state) =>
    state?.historial.filter((el) => el.pagado === true)
  );
  const [load, setLoading] = useState(false);
  //const historial = useSelector((state) => state?.historial);
  const results = useSelector((state) => state.Status);

  console.log(historial);

  const averageScore = () => {
    let average = 0;
    if (reviews.length) {
      reviews.forEach((r) => {
        average += r.score;
      });
      return (average / reviews.length).toFixed(1);
    } else {
      return 0;
    }
  };

  const [user, setUser] = useState(null);
  const [filterBySize, setFilterBySize] = useState("");
  const [filterByColor, setFilterByColor] = useState("");

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data);
      }
    })();
    setTimeout(() => {
      setLoading(true);
    }, 300);
    dispatch(getProductDetail(id));
    setLoading(false);
    dispatch(clearActions());
    dispatch(getProductDetailReviews(id));
    dispatch(buyHistorial(user?.id));
  }, [dispatch, user, id]);

  const profileId = user?.id;
  const token = validateUser();

  const handleFav = () => {
    if (!user) {
      toast("Logueate para seguir tus productos favoritos!");
      return navigate("/login");
    } else {
      dispatch(addToFavorites(id, profileId, token));
      toast("Producto agregado a favoritos!");
    }
  };

  const handleDelFav = () => {
    dispatch(deleteFavorite(id, profileId, token));
    toast("Producto eliminado de favoritos", "yellow");
  };

  const handleAddCart = () => {
    if (!user) {
      toast("Logueate para seguir tus productos favoritos!");
      return navigate("/login");
    }
    if (filterBySize === "") return toast("Selecciona talle!", "yellow");
    if (filterByColor === "") return toast("Selecciona color!", "yellow");
    if (
      detail.variants
        ?.map((v) => {
          if (v.size === filterBySize && v.color === filterByColor && v.stock) {
            return v.stock;
          }
          return false;
        })
        .reduce((a, b) => a + b) === 0
    )
      toast("No hay stock!", "red");
    else {
      const variantID = detail.variants
        ?.map((v) => {
          if (v.size === filterBySize && v.color === filterByColor && v.stock) {
            return v.id;
          }
          return "";
        })
        .reduce((a, b) => a + b);
      dispatch(addToCart(variantID, profileId, token));
      toast("Producto agregado al carrito!");
    }
  };

  const handleDesactivate = () => {
    dispatch(deactivateProduct(id)).then(toast("Producto desactivado"));
    navigate("/home");
  };

  //FILTER ACTIVITY
  const handleSize = (e) => {
    e.preventDefault();
    setFilterBySize(e.target.value);
  };
  //FILTER COLOR
  const handleColor = (e) => {
    e.preventDefault();
    setFilterByColor(e.target.value);
  };
  if (load === false) {
    return (
      <div className={Style.ProductContainer}>
        <img className={Style.NavbarHomeLogo} src={Logo} alt="logo" />
        <h1 className={Style.loading}>{results}</h1>;
      </div>
    );
  } else {
    return (
      <div className={Style.ProductContainer}>
        <div className={Style.sectionDetails}>
          <div className={Style.sectionDetailsButtons}>
            <button className={Style.backButton} onClick={() => navigate(-1)}>
              Atrás
            </button>
            <button
              className={Style.buttonCartDetail}
              onClick={() => handleAddCart()}
            >
              <img
                className={Style.buttonImage}
                src={buttonCart}
                alt="img not found"
              ></img>
            </button>

            {!favorites.find((f) => f?.id === id) ? (
              <button
                className={Style.buttonfavDetail}
                onClick={() => handleFav()}
              >
                <img
                  className={Style.buttonImage}
                  src={buttonFav}
                  alt="img not found"
                ></img>
              </button>
            ) : (
              <button
                className={Style.buttonDeletefavDetail}
                onClick={() => handleDelFav()}
              >
                <img
                  className={Style.buttonImage}
                  src={buttonDeleteFav}
                  alt="img not found"
                ></img>
              </button>
            )}
            {user?.isModerator ? (
              <button
                className={Style.buttonDeleteDetail}
                onClick={() => handleDesactivate(id)}
              >
                <img
                  id={Style.TrashImage}
                  className={Style.buttonImage}
                  src={buttonDelete}
                  alt="img not found"
                ></img>
              </button>
            ) : null}
          </div>
          <br />
          <div className={Style.article__details}>
            <div className={Style.articleDetailsImageContainer}>
              <img
                className={Style.articleDetailsImage}
                src={detail.image}
                alt="img not found"
              />
            </div>
            <div className={Style.article_details_container}>
              <h1 className={Style.detailsTitle}>
                {detail.name?.charAt(0).toUpperCase() + detail.name?.slice(1)}
              </h1>
              {detail?.storeName ? (
                <>
                  <h2>Tienda: {detail?.storeName}</h2>
                </>
              ) : (
                <h2>Tienda: Independiente</h2>
              )}

              <label
                id={Style.article_price}
                className={Style.article_label}
                htmlFor=""
              >
                Precio: ${detail.price}
              </label>
              <label className={Style.article_label} htmlFor="">
                Seleccionar Talle:
              </label>
              <select
                id={Style.FilterProductsSelectTalle}
                className={Style.FilterProductsSelect}
                value={filterBySize}
                onChange={(e) => handleSize(e)}
              >
                <option value="">Todos</option>

                {[...new Set(detail.variants?.map((e) => e.size))]?.map(
                  (el) => {
                    return <option value={el}>{el}</option>;
                  }
                )}
              </select>
              <label className={Style.article_label} htmlFor="">
                Seleccionar Color:
              </label>
              <select
                id={Style.FilterProductsSelectColor}
                className={Style.FilterProductsSelect}
                value={filterByColor}
                onChange={(e) => handleColor(e)}
              >
                <option value="">Todos</option>

                {[...new Set(detail.variants?.map((e) => e.color))]?.map(
                  (el) => {
                    return <option value={el}>{el}</option>;
                  }
                )}
              </select>
              {detail.brand ? (
                <label className={Style.article_label}>
                  Marca: {detail.brand}
                </label>
              ) : null}
              {detail.materials ? (
                <label className={Style.article_label}>
                  Material: {detail.materials}
                </label>
              ) : null}
              <div className={Style.article__detail_stock}>
                <label
                  id={Style.article_labelStock}
                  className={Style.article_label}
                  htmlFor=""
                >
                  Stock:{" "}
                  {filterByColor && filterBySize ? (
                    <label
                      id={Style.article_labelStock}
                      className={Style.article_label}
                    >
                      {detail.variants
                        ?.map(
                          (v) =>
                            v.size === filterBySize &&
                            v.color === filterByColor &&
                            v.stock
                        )
                        .reduce((a, b) => a + b)}{" "}
                      unidades
                    </label>
                  ) : filterBySize ? (
                    <label
                      id={Style.article_labelStock}
                      className={Style.article_label}
                    >
                      {detail.variants
                        ?.map((v) => v.size === filterBySize && v.stock)
                        .reduce((a, b) => a + b)}{" "}
                      unidades
                    </label>
                  ) : filterByColor ? (
                    <label
                      id={Style.article_labelStock}
                      className={Style.article_label}
                    >
                      {detail.variants
                        ?.map((v) => v.color === filterByColor && v.stock)
                        .reduce((a, b) => a + b)}{" "}
                      unidades
                    </label>
                  ) : (
                    <label
                      id={Style.article_labelStock}
                      className={Style.article_label}
                    >
                      {detail.variants
                        ?.map((v) => v.stock)
                        .reduce((a, b) => a + b)}{" "}
                      unidades
                    </label>
                  )}
                </label>
              </div>
              <br></br>
              {reviews.length ? (
                <label
                  id={Style.article_labelStock}
                  className={Style.article_label}
                >
                  Puntaje promedio: {averageScore()}
                </label>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div>
            <div>
              {historial?.filter((el) => el.productoId === id).length ? (
                <CreateReview id={id} />
              ) : (
                <></>
              )}
              <h1 className={Style.ProductDetailReviews}>Reseñas</h1>
              {reviews.length ? (
                reviews.map((r) => (
                  <Comments score={r.score} reviews={r.reviews} />
                ))
              ) : (
                <h3>No hay reseñas</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default ProductDetail;
