const {profile,Op, product, qualification} = require('../../DataBase/db');

const addReview = async (id, review, order) => {
    if(order === "product"){
        const article = await product.findByPk(id)
        if(!article) throw Error("Este "+order+" no existe")
        const qual = await qualification.create({
            score: review.score,
            reviews: review.reviews,
            profileId:review.profileId,
        })
        article.addQualification(qual)
        return "Review agregada al "+order
    }
    else if(order === "profile"){
        const article = await profile.findByPk(id)
        if(!article) throw Error("Este "+order+" no existe")
        const qual = await qualification.create({
            score: review.score,
            reviews: review.reviews,
        })
        article.addQualification(qual)
        return "Review agregada al "+order
    }
    else throw Error("Orden incorrecta")
}

module.exports = addReview