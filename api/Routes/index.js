const { Router } = require("express");
//Aca van los archivos con las rutas
const productRoutes = require("../Routes/productRoutes");
const userRoutes = require("../Routes/userRoutes");
const storeRoutes = require("../Routes/storeRoutes");
const loginRoutes = require("./loginRoutes");
const sizesRoutes = require("../Routes/sizesRoutes");
const demographicRoutes = require("../Routes/demographicRoutes");
const reviewRoutes = require("./reviewRoutes")
const variantRoutes = require("./variantRoutes")
const paymentRoutes = require("./paymentRoutes");
const authRoutes = require("./authRoutes");
const activateRoutes = require("./activateRoutes");
const upload = require("./Utils/multer");
const marketedRoutes = require("../Routes/marketedRoutes");
const url = require("./Utils/imageUploader")
//
const router = Router();

//
router.use("/product", upload.array("image", 5), productRoutes);
//
router.use(
  "/user",
  upload.fields([{ name: "profilePicture" }, { name: "banner" }]),
  userRoutes
);
//
router.use("/stores", storeRoutes);
// login
router.use("/login", loginRoutes);
// sizes
router.use("/sizes", sizesRoutes);
// demographics
router.use("/demographics", demographicRoutes);
//review
router.use("/review", reviewRoutes);
//variant

router.use("/variant", variantRoutes)
// payment
router.use("/payment",paymentRoutes);
// auth
router.use("/auth",authRoutes);
//activate
router.use("/activate", activateRoutes);
//marketed
router.use("/marketed", marketedRoutes);

//Test
router.get("/test", (req, res, next) => {
  res.send("Hello World!!!!, im working");
  next();
});

module.exports = router;
