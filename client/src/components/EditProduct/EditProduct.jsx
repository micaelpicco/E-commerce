import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, modifyProduct } from "../../redux/actions";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Styles from "./EditProduct.module.css";
import { validateUser } from "../../sessionUtils/jwtSession";
import { demographic, colorsList, sizesList } from "./index.js";

const EditProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [colors, setColor] = useState("");
  const [sizes, setSize] = useState("");

  const token = validateUser();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);
  const detail = useSelector((state) => state.productDetail);

  const handleSelect = (e) => {
    if (e.target.name === "size") {
      setSize(e.target.value);
    } else if (e.target.name === "color") {
      setColor(e.target.value);
    }
  };

  return (
    <div className={Styles.container1}>
      <button className={Styles.BackButtons} onClick={() => navigate(-1)}>
        Atrás
      </button>

      <h1 className={Styles.subtitle}>Editar producto</h1>
      <h3> {detail.name?.charAt(0).toUpperCase() + detail.name?.slice(1)}</h3>
      <div className={Styles.articleDetailsImageContainer}>
        <img className={Styles.articleDetailsImage} src={detail.image} alt="" />
      </div>
      <Formik
        initialValues={{
          name: "",
          demographic: "",
          price: 0,
          stock: 0,
        }}
        validate={(value) => {
          let errors = {};
          if (!value.name) {
            errors.name = "Ingrese un nombre al producto";
          }

          return errors;
        }}
        onSubmit={(data, { resetForm }) => {
          let { name, demographic, price, stock } = data;

          const variants = [
            {
              stock: stock,
              color: colors,
              size: sizes,
            },
          ];

          const a = {
            id: id,
            name,
            price,
            demographic,
            variants,
          };
          console.log(a);

          dispatch(modifyProduct(token, a)).then(function (res) {
            console.log(res);
            alert("Exitoso");
          });
          setTimeout(() => {
            resetForm();
            navigate("/home/profile/sells/products").then(
              window.location.reload()
            );
          }, 2000);
        }}
      >
        {({
          handleSubmit,
          errors,
          values,
          touched,
          handleChange,
          handleBlur,
        }) => (
          <form className={Styles.form} onSubmit={handleSubmit}>
            <div className={Styles.entry}>
              <div className={Styles.column}>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre del producto"
                  name="name"
                  className={Styles.form1}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                {touched.name && errors.name && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.name}</span>{" "}
                  </div>
                )}
                <label className={Styles.article_label} htmlFor="">
                  Precio
                </label>
                <input
                  type="range"
                  id="price"
                  name="price"
                  className={Styles.range}
                  value={values.price}
                  min="0"
                  max="100"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                <p className={Styles.output}>{values.price}$</p>
                <label className={Styles.article_label} htmlFor="">
                  Cantidad
                </label>

                <input
                  type="range"
                  id="stock"
                  name="stock"
                  className={Styles.range}
                  value={values.stock}
                  min="0"
                  max="100"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyUp={handleBlur}
                  required
                  autoComplete="off"
                />
                <p className={Styles.output}>{values.stock}</p>
                <div className={Styles.SelectContainer}>
                  <select
                    id={Styles.FilterProductsSelectColor}
                    className={Styles.FilterProductsSelect}
                    name="demographic"
                    onChange={handleChange}
                  >
                    <option
                      className="option"
                      value="*"
                      disabled
                      selected
                      hidden
                    >
                      Demografia
                    </option>
                    {demographic?.map((demo) => (
                      <option
                        className="option"
                        value={demo}
                        onChange={handleChange}
                      >
                        {demo}
                      </option>
                    ))}
                  </select>
                  <select
                    name="size"
                    id={Styles.FilterProductsSelectColor}
                    className={Styles.FilterProductsSelect}
                    onChange={handleSelect}
                  >
                    <option
                      className="option"
                      value=""
                      disabled
                      selected
                      hidden
                    >
                      Talles
                    </option>
                    {sizesList.map((s) => (
                      <option key={s} value={s} onChange={handleChange}>
                        {s}
                      </option>
                    ))}
                  </select>
                  {/*   <div className="select-option">
                  {sizes?.map((d) => (
                    <div key={d} className="div-delete">
                      <p>{d}</p>
                      <button
                        className="btn-delete"
                        name="size"
                        onClick={() => handleDelete(d)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div> */}
                  <select
                    name="color"
                    className={Styles.FilterProductsSelect}
                    onChange={handleSelect}
                  >
                    <option
                      className="option"
                      value=""
                      disabled
                      selected
                      hidden
                    >
                      Colores
                    </option>
                    {colorsList.map((c) => (
                      <option key={c} value={c} onChange={handleChange}>
                        {c}
                      </option>
                    ))}
                  </select>
                  {/*  <div className="select-option">
                  {colors?.map((e) => (
                    <div key={e} className="div-delete">
                      <p>{e}</p>
                      <button
                        className="btn-delete"
                        name="size"
                        onClick={() => handleDeleteColor(e)}
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div> */}
                </div>
                <div>
                  {!values.name ||
                  !values.price ||
                  !values.stock ||
                  !values.demographic ||
                  !sizes ||
                  !colors ? (
                    <div>
                      <button className={Styles.btnDisabled2} disabled>
                        Editar producto
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className={Styles.submit2}>
                        Editar producto
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
export default EditProduct;
