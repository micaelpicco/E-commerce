const { DataTypes } = require("sequelize");
const { sizes } = require("../utils/sizes.js");
const { demographic } = require("../utils/demographic");

module.exports = (sequelize) => {
  sequelize.define("product", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue("name", value.toLowerCase());
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    temporal_price: {
      type: DataTypes.FLOAT,
    },
    materials: {
      type: DataTypes.STRING,
    },
    brand: {
      type: DataTypes.STRING,
    },
    demographic: {
      type: DataTypes.STRING,
      allowNull: false,
      validator: {
        isIn: [demographic],
      },
    },
    image: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
};
