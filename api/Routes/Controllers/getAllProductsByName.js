const {product, Op} = require("../../DataBase/db")
const paginated = require("./paginado")

const getProductName = async (search,cant) => {
    const allproducts = await product.findAll({
        where:{
            name:{
                [Op.like]: '%'+search.toLowerCase()+'%'
            }
        },
        raw: true})
    let data = await allproducts
    //console.log(data.length)
    if(!data.length) throw Error("No existe ningun producto con ese nombre")
    if(cant){
        return paginated(data, cant)
    }
    else return data
}

module.exports = getProductName