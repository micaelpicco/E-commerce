import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/actions";
import { Formik } from "formik";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./CreateProduct.module.css";
import { validateUser } from "../../sessionUtils/jwtSession";
import { getUserData } from "../../Utils/useLocalStorage";
import { demographic, colorsList, sizesList } from "./index.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [productImage, setProductImage] = useState("");
  const [colors, setColor] = useState("");
  const [sizes, setSize] = useState("");
  const toast = (text) =>
    Toastify({
      text: text,
      duration: 2000,
      position: "center",
      className: Styles.toast,
      backgroundColor: "#32CD32",
    }).showToast();

  useEffect(() => {
    (async () => {
      if (!user) {
        const data = await getUserData();
        setUser(data?.id);
      }
    })();
  }, [user, dispatch]);
  const token = validateUser();

  const handleSelect = (e) => {
    if (e.target.name === "size") {
      setSize(e.target.value);
    } else if (e.target.name === "color") {
      setColor(e.target.value);
    }
  };

  const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];

  const imageRef = useRef(null);
  console.log(productImage.split(";")[0]);
  console.log(productImage.split(";")[0].split(":")[1]);
  console.log(productImage.split(";")[0].split("/")[1]);

  console.log(
    SUPPORTED_FORMATS.includes(productImage.split(";")[0].split(":")[1])
  );
  return (
    <div className={Styles.container1}>
      <button className={Styles.BackButtons} onClick={() => navigate(-1)}>
        Atrás
      </button>
      <h1 className={Styles.subtitle}>Crear un Producto</h1>
      <Formik
        initialValues={{
          id: "",
          name: "",
          demographic: "",
          price: 0,
          stock: 0,
          image: null,
          size: "",
          color: "",
        }}
        validate={(value) => {
          console.log(value);
          let errors = {};
          if (!value.name) {
            errors.name = "Ingrese un nombre al producto";
          } else if (!/^[\w][\S]{0,}$/.test(value.name)) {
            errors.name = "nombre no puede iniciar con caracteres speciales";
          } else if (
            !SUPPORTED_FORMATS.includes(
              productImage.split(";")[0].split(":")[1]
            )
          ) {
            errors.image = "formatos soportados para imagen son jpg,jpeg y png";
          }
          return errors;
        }}
        //validationSchema={createSchema}
        onSubmit={(data, { resetForm }) => {
          let { id, name, demographic, price, stock } = data;
          id = user;

          const variants = [
            {
              stock: stock,
              color: colors,
              size: sizes,
            },
          ];
          const a = {
            id,
            name,
            image: productImage,
            price,
            demographic,
            variants,
          };
          console.log(a);

          dispatch(createProduct(token, a)).then(function (res) {
            console.log(res);
            toast("Producto creado exitosamente");
          });
          setTimeout(() => {
            resetForm();
            navigate("/home/profile").then(window.location.reload());
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
                  Imagen del producto
                </label>
                <input
                  type="file"
                  ref={imageRef}
                  id="image"
                  placeholder="Imagenes"
                  name="image"
                  accept="image/png, image/jpeg"
                  className={`${Styles.formControl} form-control`}
                  value={values.image}
                  onChange={(e) => {
                    e.preventDefault();
                    const reader = new FileReader();
                    reader.readAsDataURL(e.target.files[0]);
                    reader.onloadend = () => {
                      let imageData = reader.result;
                      setProductImage(imageData);
                    };
                  }}
                  onBlur={handleBlur}
                  required
                  autoComplete="off"
                />
                <div className={Styles.articleDetailsImageContainer}>
                  <img
                    className={Styles.articleDetailsImage}
                    src={productImage}
                    alt=""
                  />
                </div>
                {touched.image && errors.image && (
                  <div className={Styles.error}>
                    {" "}
                    <span>{errors.image}</span>{" "}
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
                      Colores
                    </option>
                    {colorsList.map((c) => (
                      <option key={c} value={c} onChange={handleChange}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
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
                <div>
                  {!values.name ||
                  !values.price ||
                  !values.stock ||
                  !values.demographic ||
                  !sizes ||
                  !colors ? (
                    <div>
                      <button className={Styles.btnDisabled2} disabled>
                        Crear producto
                      </button>
                    </div>
                  ) : (
                    <div>
                      <button type="submit" className={Styles.submit2}>
                        Crear producto
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
export default CreateStore;
