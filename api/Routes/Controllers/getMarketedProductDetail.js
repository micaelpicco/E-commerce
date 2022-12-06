const { marketedProduct } = require("../../DataBase/db");

const getMarketedProductDetail = async (id) => {
  const detail = marketedProduct.findByPk({ where: { productId: id } });
  const data = await detail;
  if (!data) throw Error("Este producto no existe");
  return data;
};

module.exports = getMarketedProductDetail;
