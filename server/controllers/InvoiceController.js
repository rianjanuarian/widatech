const { invoice, product, invoiceproduct } = require("../models");
class InvoiceController {
  static async getInvoice(req, res) {
    try {
      let results = await invoice.findAll({
        include: [product],
      });
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  }
  static async create(req, res) {
    try {
      const { customer, salesperson, notes, productsold, productId } = req.body;
      let results = await invoice.create({
        customer,
        salesperson,
        notes,
        productsold,
      });
      let resInvoiceJunc = await invoiceproduct.create({
        invoiceId: results.id,
        productId,
      });
      let initProd = await product.findByPk(productId);
      if (initProd) {
        const updateStock = initProd.stock - productsold;
        await initProd.update({ stock: updateStock });
      }

      res.json(results);
    } catch (error) {
      res.json(error);
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let deleteJunc = await invoiceproduct.destroy({
        where: { invoiceId: id },
      });
      let results = await invoice.destroy({
        where: { id },
      });

      if (results === 1) {
        res.json(`id ${id} successfully deleted`);
      } else {
        res.json(`id ${id} not found`);
      }
    } catch (error) {
      res.json(error);
    }
  }
  static async detail(req,res){
    try {
      const id = +req.params.id
      let result = await invoice.findByPk(id,{include:[product]})
      res.json(result)
    } catch (error) {
      res.json(error)
    }
  }
}
module.exports = InvoiceController;
