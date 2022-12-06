const { product } = require("../../DataBase/db");
const url = require("../Utils/imageUploader");

const patchProduct = async (req) => {
  let { id, name, price, materials, brand, demographic, image } = req.body;
  if (!image) image = [];
  if (req.files) {
    for (const file of req.files) {
      console.log(file);
      const cUrl = await url(await file.path);
      image.push(await cUrl);
    }
  }

  const prod = await product.findByPk(id);
  if (!(await prod)) throw Error("Product doesnt exist");
  prod.name = name ? name : prod.name;
  prod.price = price ? price : prod.price;
  prod.materials = materials ? materials : prod.materials;
  prod.brand = brand ? brand : prod.brand;
  prod.demographic = demographic ? demographic : prod.demographic;
  prod.image = prod.image.concat(image);
  await prod.save();
  return prod;
};

module.exports = patchProduct;
