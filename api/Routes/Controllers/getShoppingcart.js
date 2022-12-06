const {profile,Op, product,variant} = require('../../DataBase/db');

const getShoppingcart = async (id) => {

    const user = await profile.findByPk(id, {raw:true})
    const data =  await user
    if(!data) throw Error("El perfil no existe")
    let productsArray = []
    const shopping = await data.shoppingCart
    //console.log("Todos los ids = ",shopping," LENGTH = "+shopping.length)
    for(const idp of shopping){
        const varian = await variant.findByPk(idp, {raw:true})
        console.log(await varian)
        const prod = await product.findByPk(varian.productId, {raw:true})
        const resolved = await prod
        resolved["variantID"] = await varian.id
        resolved["size"] = await varian.size
        resolved["color"] = await varian.color
        productsArray.push(await resolved)
    }
    //console.log("PRODUCTOS FINALES => ",productsArray)
    return productsArray
}

module.exports = getShoppingcart