const { marketedProduct } = require("../../DataBase/db");

const getAllMarketedProducts = async (id) => {
  const allProducts = marketedProduct.findAll({ where: { profileId: id } });
  const data = await allProducts;
  if (!data) throw Error("No existe ningun producto");
  return data;
};

module.exports = getAllMarketedProducts;
