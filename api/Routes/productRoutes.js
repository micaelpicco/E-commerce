const { Router } = require("express");
const { product, profile } = require("../DataBase/db");

//Aca van los archivos de los controladores
const getAllProducts = require("./Controllers/getAllProducts");
const getProductName = require("./Controllers/getAllProductsByName");
const getFilteredProducts = require("./Controllers/getFilteredProducts");
const getProductDetail = require("./Controllers/getProductDetail");
const addReview = require("./Controllers/addReview");
const getReview = require("./Controllers/getReviews");
const getAvrg = require("./Controllers/avrgScore");
const addProduct = require("./Controllers/addProduct");
const patchProduct = require("./Controllers/patchProduct");
const { getToken } = require("./Utils/getToken");
const url = require("./Utils/imageUploader");
const passport = require("passport");
const jwt = require("jsonwebtoken");
//
const router = Router();

//Aca abajo van las rutas separadas
//Trae todos los productos con una cantidad especificada por arreglo
router.get("/all/:cant", async (req, res) => {
  const cant = req.params.cant;
  try {
    const allproducts = await getAllProducts(cant);
    res.status(200).send(allproducts);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//Trae todos los productos
router.get("/all", async (req, res) => {
  try {
    const allproducts = await getAllProducts(0);
    res.status(200).send(allproducts);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//
//Traer todos los productos por nombre / Trae por query la variable search (string de busqueda) y cant (cantidad de elementos en paginado)
router.get("/", async (req, res) => {
  const search = req.query.search;
  const cant = req.query.cant;
  try {
    if (cant) {
      const productsByName = await getProductName(search, cant);
      res.status(200).send(productsByName);
    } else {
      const productsByName = await getProductName(search, 0);
      res.status(200).send(productsByName);
    }
  } catch (error) {
    res.status(404).send(error);
  }
});
//

//Filtrados
router.get("/filter", async (req, res) => {
  const { name, size, price, demographic, color, page, sortBy, orderBy } =
    req.query;
    console.log(req.query);
  try {
    const products = await getFilteredProducts(
      name,
      size,
      price,
      demographic,
      color,
      page,
      sortBy,
      orderBy
    );
    res.status(200).send(products);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//Agregar un producto ruta privada
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const response = await addProduct(req);
      res.send(response);
    } catch (error) {
      res.send(error);
    }
  }
);
//Trae las reviews al producto
router.get("/review/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getReview(id, "product");
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//Trae el promedio de puntaje del usuario
router.get("/review/avrg/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const response = await getAvrg(id, "product");
    res.status(200).send(response);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
//Agrega una review
router.post(
  "/review/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const id = req.params.id;
    const { secret_token } = req.query;
    const decodedToken = jwt.verify(secret_token, process.env.SECRET);
    const data = { ...req.body };
    data.profileId = decodedToken.id;
    try {
      const response = await addReview(id, data, "product");
      res.status(200).send(response);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
);

// Detalles del producto
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const detail = await getProductDetail(id);
    res.send(detail);
  } catch (err) {
    next(err);
  }
});
//Modifica un producto
router.patch(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const detail = await patchProduct(req);
      res.send(detail);
    } catch (err) {
      next(err);
    }
  }
);

//exportamos el router
module.exports = router;
