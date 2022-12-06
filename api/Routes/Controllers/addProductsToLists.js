const {profile,Op,variant} = require('../../DataBase/db');


const addProductsToLists = async(productID, userID, order) => {
    if(order === "fav"){
        
        const user = await profile.findByPk(userID)
        const data = await user
        if(!data) throw Error("Ese perfil no existe")
        data.dataValues.favorites.push(productID)
        await profile.update({favorites: data.dataValues.favorites}, {where:{id:userID}})
        return "El producto se agrego a favoritos"
    }
    else if(order === "shop"){
        const user = await profile.findByPk(userID)
        const data = await user
        if(!data) throw Error("Ese perfil no existe")
        const vari = await variant.findByPk(productID)
        if(!await vari) throw Error("Esta variante no existe")
        data.dataValues.shoppingCart.push(productID)
        await profile.update({shoppingCart: data.dataValues.shoppingCart}, {where:{id:userID}})
        return "El producto se agrego al carrito"
    }
    else throw Error("Orden incorrecta")
    
}

module.exports = addProductsToLists