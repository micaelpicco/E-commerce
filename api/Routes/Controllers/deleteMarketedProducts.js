const {
    profile,
    marketedProduct,
  } = require("../../DataBase/db");

const deleteMarketedProducts = async (id) => {
    await marketedProduct.destroy({where:{profileId:id,pagado:false}})
    return "registros eliminados"
}
module.exports = deleteMarketedProducts