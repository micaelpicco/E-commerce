const {
    marketedProduct,
  } = require("../../DataBase/db");

const getSelledProducts = async (id) => {
    console.log(id)
    const selled = await marketedProduct.findAll({where:{sellerId:id}},{raw:true})
    const data = await selled
    return data
}

module.exports = getSelledProducts