const {qualification} = require('../../DataBase/db');

const getAvrg = async (id, order) => {
    if(order === "product"){
        const review = await qualification.findAll({where:{productId: id}, raw: true})
        const data = await review
        if(!data.length) throw Error("Este producto no tiene reviews") 
        let scoreA = 0
        data.forEach(rev => {
             scoreA += rev.score
        });
        scoreA = scoreA / data.length
        return (scoreA.toFixed(1)).toString()
    }
    else if(order === "profile"){
        const review = await qualification.findAll({where:{profileId: id}, raw: true})
        const data = await review
        if(!data.length) throw Error("Este perfil no tiene reviews") 
        let scoreA = 0
        data.forEach(rev => {
             scoreA += rev.score
        });
        scoreA = scoreA / data.length
        return (scoreA.toFixed(1)).toString()
    }
    else throw Error("Orden incorrecta") 
}

module.exports = getAvrg