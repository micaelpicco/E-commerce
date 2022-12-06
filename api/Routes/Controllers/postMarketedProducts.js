const { profile, marketedProduct } = require("../../DataBase/db");
//const { reduceStock } = require("./variantsStock");

const postMarketedProducts = async (id, productos) => {
  const user = await profile.findByPk(id);

  for (const productSold of productos) {
    console.log(productSold);
    const comprados = await marketedProduct.create({
      status: "Compra aprobada",
      price: productSold.price,
      name: productSold.name,
      size: productSold.size,
      color: productSold.color,
      demographic: productSold.demographic,
      productoId: productSold.id,
      sellerId: productSold.profileId,
      variantId: productSold.variantID,
    });
    await user.addMarketedProduct(comprados);
  }

  return "Compra realizada";
};

module.exports = postMarketedProducts;
