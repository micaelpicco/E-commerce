const { DataTypes } = require("sequelize");
const { sizes } = require("../utils/sizes.js");

module.exports = (sequelize) => {
  sequelize.define("variant", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    size: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        isIn: [sizes],
      },
    },
    color: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
