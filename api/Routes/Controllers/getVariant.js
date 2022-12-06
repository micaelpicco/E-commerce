const {variant} = require("../../DataBase/db")

const getVariant = async(id) => {
    const variantid = await variant.findByPk(id)
    const data = await variantid
    if(!data) throw Error("No existe esta variante")
    return data
}

module.exports = getVariant

