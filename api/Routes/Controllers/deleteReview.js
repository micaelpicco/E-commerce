const {qualification} = require('../../DataBase/db');

const deleteReview = async (id) => {
    let review = await qualification.findByPk(id)
    if(!review) throw Error("No existe esa review")
    await qualification.destroy({where:{id:id}})
    review = await qualification.findByPk(id)
    
    return "Eliminado exitosamente"
}

module.exports = deleteReview