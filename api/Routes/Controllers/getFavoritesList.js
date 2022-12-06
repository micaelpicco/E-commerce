const { profile, product } = require("../../DataBase/db");

const getFavoritesList = async (id) => {
  const user = await profile.findByPk(id, { raw: true });
  const data = await user;
  if (!data) throw Error("El perfil no existe");
  let productsArray = []
    const favoritesArray = await data.favorites
    //console.log("Todos los ids = ",favoritesArray," LENGTH = "+favoritesArray.length)
    for(const idp of favoritesArray){
        const prod = await product.findByPk(idp, {raw:true})
        const resolved = await prod
        productsArray.push(await resolved)
    }
    //console.log("PRODUCTOS FINALES => ",productsArray)
    return productsArray
};

module.exports = getFavoritesList;
