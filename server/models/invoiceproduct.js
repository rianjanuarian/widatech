'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class invoiceproduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      invoiceproduct.belongsTo(models.invoice)
      invoiceproduct.belongsTo(models.product)
    }
  }
  invoiceproduct.init({
    invoiceId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'invoiceproduct',
  });
  return invoiceproduct;
};