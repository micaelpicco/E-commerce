const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
  sequelize.define("profile", {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    username:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mail: {
      type: DataTypes.STRING,
      uniq: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    googleId:{
      type:DataTypes.STRING,
      allowNull:true,
    },
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    storeName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    banner: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    profilePicture:{
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    favorites: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
    },
    shoppingCart: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
    },
    isActive:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    isModerator:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    verified:{
      type:DataTypes.BOOLEAN,
      allowNull:false,
      defaultValue:false,
    }
  });
};
