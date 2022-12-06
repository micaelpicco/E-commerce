const {variant} = require("../../DataBase/db")

const addStock = async (id, cant) => {
    const varian = await variant.findByPk(id)
    if(!await varian) throw Error("Variante no existe") 
    varian.stock = varian.stock + cant
    await varian.save()
    return "Stock aumentado en "+cant
}

const reduceStock = async (id, cant) => {
    const varian = await variant.findByPk(id)
    if(!await varian) throw Error("Variante no existe") 
    varian.stock -= cant
    await varian.save()
    return "Stock reducido en "+cant
}

module.exports = {
    reduceStock,
    addStock
}