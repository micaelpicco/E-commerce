const { product, profile, Op, variant } = require("../../DataBase/db");
const url = require("../Utils/imageUploader");
const cloudinary = require("../Utils/cloudinary");

const addProduct = async (req) => {
  const { id, name, price, materials, brand, demographic, image, variants } =
    req.body;

  const profileLink = await profile.findByPk(id);
  if (!(await profileLink)) throw Error("Profile dont exist");
  console.log("", req.body);
  if (id && name && image && demographic && variants && price) {
    let variantArray = [];
    for (let i = 0; i < variants.length; i++) {
      const newV = await variant.create(variants[i]);
      variantArray.push(newV);
    }
    try {
      const productImage = await cloudinary.uploader.upload(
        image,
        {
          upload_preset: "yvjjtrzu",
          public_id: `algo`,
          allowed_formats: ["png", "jpg", "jpeg"],
        },
        function (error, result) {
          if (error) {
            console.log(error);
          }
          console.log(result);
        }
      );
      const newProduct = await product.create({
        name,
        price,
        materials,
        brand,
        demographic,
        image: [productImage.url],
      });
      await newProduct.addVariants(variantArray);
      await profileLink.addProduct(newProduct);
      return "Producto creado con exito";
    } catch (error) {
      console.log(error);
    }
    //console.log(arrayImages)
  } else throw Error("Insufficient information");
};

module.exports = addProduct;
