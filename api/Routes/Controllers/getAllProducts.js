const {product, variant} = require("../../DataBase/db")
const paginated = require("./paginado")

const getAllProducts = async (cant) => {

    const allproducts = await product.findAll({include: variant},{raw: true})
    let data = await allproducts
    console.log(data.length)
    if(!data.length) throw Error("No existe ningun producto")
    
    if(cant){
        return paginated(data, cant)
    }
    else return data
    

}

module.exports = getAllProducts