const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("marketedProduct", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    size: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    demographic: { type: DataTypes.STRING, allowNull: false },
    productoId: { type: DataTypes.STRING, allowNull: false },
    sellerId: { type: DataTypes.STRING, allowNull: false },
    variantId: { type: DataTypes.STRING, allowNull: false },
    pagado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  });
};
