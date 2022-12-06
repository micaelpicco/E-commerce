const {product} = require('../../DataBase/db');


const activateProduct = async (id) => {
    const produ = await product.findByPk(id)
    if(!produ) throw Error("Product doesnt exist")
    await product.update({isActive: true}, {where:{id:id}})
    return "Product Activated"
}

module.exports = activateProduct