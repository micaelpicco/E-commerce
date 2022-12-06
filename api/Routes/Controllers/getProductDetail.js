const { product, variant } = require("../../DataBase/db");

const getProductDetail = async (id) => {
  const detail = await product.findByPk(id, { include: variant });
  if (!detail) throw Error(`No existe el producto con la id ${id}`);
  return detail;
};

module.exports = getProductDetail;
