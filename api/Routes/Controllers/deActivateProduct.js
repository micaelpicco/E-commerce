const {product} = require('../../DataBase/db');


const deActivateProduct = async (id) => {
    const produ = await product.findByPk(id)
    if(!produ) throw Error("Product doesnt exist")
    await product.update({isActive: false}, {where:{id:id}})
    return "Product desactivated"
}

module.exports = deActivateProduct