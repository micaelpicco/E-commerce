const { Router } = require("express");
const router = Router();
const {
    getDemographics,
} = require("./Controllers/getDemographics");

// rutas sizes
router.get("/",getDemographics);

module.exports = router;