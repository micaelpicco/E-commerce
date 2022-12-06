const {variant} = require("../../DataBase/db")

const deleteVariant = async(id) => {
    await variant.destroy({where:{id:id}})
    const variantid = await variant.findByPk(id)
    const data = await variantid
    if(data) throw Error("Variante no se elimino correctamente")
    return "Variante eliminada exitosamente"
}

module.exports = deleteVariant