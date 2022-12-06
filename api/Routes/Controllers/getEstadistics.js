const {
    profile,
    marketedProduct,
  } = require("../../DataBase/db");

  const getEstadistics = async (id) => {
    const allSells = await marketedProduct.findAll({raw:true},{where:{sellerId:id}})
    
    let data = []
    for(const sell of allSells){
        console.log(await sell)
        if(sell.profileId){
            let ubi = await profile.findByPk(sell.profileId, {raw:true})
            ubi = await ubi.location
            data.push({
                size: sell.size,
                price: sell.price,
                demographic: sell.demographic,
                created: sell.createdAt,
                location: ubi,
                productoId: sell.productoId
            })
        }
    }
    return data
  }

  module.exports = getEstadistics