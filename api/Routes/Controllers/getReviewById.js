const {qualification} = require('../../DataBase/db');


const getReviewById = async (id) => {
    const review = qualification.findByPk(id)
    const data = await review
    if(!data) throw Error("Este review no existe")
    return data
}

module.exports = getReviewById