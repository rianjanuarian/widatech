"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invoice.belongsToMany(models.product, {
        through: models.invoiceproduct,
      });
    }
  }
  invoice.init(
    {
      customer: DataTypes.STRING,
      salesperson: DataTypes.STRING,
      productsold: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "invoice",
    }
  );
  return invoice;
};
