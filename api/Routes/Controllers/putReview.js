const {qualification} = require('../../DataBase/db');

const putReview = async (id, body) => {
    if(body.score > 5 || body.score < 1) throw Error("La calificacion tiene que ser de 1 a 5")
    let review = await qualification.findByPk(id)
    if(!review) throw Error("No existe esa review")
    await qualification.update(body, {where: {id:id}})
    review = await qualification.findByPk(id)
    return await review
}

module.exports = putReview