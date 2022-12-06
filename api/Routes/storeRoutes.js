const { Router } = require("express");
const router = Router();
const {
    getAllStores,
    getStoreByName,
} = require('./Controllers/stores');
const getEstadistics = require("./Controllers/getEstadistics")

// rutas vendedores
router.get("/all",getAllStores);
router.get("/",getStoreByName);
//trae estadistica de productos vendidos
router.get("/sells/:id", async (req, res) => {
    const id = req.params.id
    try {
      const response = await getEstadistics(id);
      res.status(200).send(response);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

module.exports = router;