const {variant} = require("../../DataBase/db")

const putVariant = async(id, body) => {
    const variantid = await variant.findByPk(id)
    const data = await variantid
    if(!data) throw Error("No existe esta variante")
    await variant.update(body,{where:{id:id}})
    const newV = await variant.findByPk(id)
    return await newV
}

module.exports = putVariant