const { profile, Op } = require("../../DataBase/db");

const deleteProductsOfList = async (productID, userID, order) => {
  if (order === "fav" && !productID) {
    const user = await profile.findByPk(userID);
    const data = await user;
    if (!data) throw Error("Ese perfil no existe");
    if (!data.dataValues.favorites.length)
      throw Error("Este perfil no tiene ningun producto en favoritos");
    data.dataValues.favorites = [];
    await profile.update(
      { favorites: data.dataValues.favorites },
      { where: { id: userID } }
    );
    return "El producto se elimino de favoritos";
  } else if (order === "fav") {
    const user = await profile.findByPk(userID);
    const data = await user;
    if (!data) throw Error("Ese perfil no existe");
    if (!data.dataValues.favorites.length)
      throw Error("Este perfil no tiene ningun producto en favoritos");
    data.dataValues.favorites = data.dataValues.favorites.filter(
      (prod) => prod !== productID
    );
    await profile.update(
      { favorites: data.dataValues.favorites },
      { where: { id: userID } }
    );
    return "El producto se elimino de favoritos";
  } else if (order === "shop" && !productID) {
    const user = await profile.findByPk(userID);
    const data = await user;
    if (!data) throw Error("Ese perfil no existe");
    if (!data.dataValues.shoppingCart.length)
      throw Error("Este perfil no tiene ningun producto en el carrito");
    data.dataValues.shoppingCart = [];
    await profile.update(
      { shoppingCart: data.dataValues.shoppingCart },
      { where: { id: userID } }
    );
    return "El producto se elimino del carrito";
  } else if (order === "shop") {
    const user = await profile.findByPk(userID);
    const data = await user;
    if (!data) throw Error("Ese perfil no existe");
    if (!data.dataValues.shoppingCart.length)
      throw Error("Este perfil no tiene ningun producto en el carrito");
    data.dataValues.shoppingCart = data.dataValues.shoppingCart.filter(
      (prod) => prod !== productID
    );
    await profile.update(
      { shoppingCart: data.dataValues.shoppingCart },
      { where: { id: userID } }
    );
    return "El producto se elimino del carrito";
  } else throw Error("Orden incorrecta");
};
module.exports = deleteProductsOfList;
