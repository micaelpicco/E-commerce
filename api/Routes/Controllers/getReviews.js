const {qualification} = require('../../DataBase/db');

const getReview = async (id, order) => {
    if(order === "product"){
        const review = await qualification.findAll({where:{productId: id}})
        const data = await review
        if(!data.length) throw Error("Este producto no tiene reviews") 
        return data
    }
    else if(order === "profile"){
        const review = await qualification.findAll({where:{profileId: id}})
        const data = await review
        if(!data.length) throw Error("Este perfil no tiene reviews") 
        return data
    }
    else throw Error("Orden incorrecta") 
}

module.exports = getReview