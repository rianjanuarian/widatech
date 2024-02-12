const { product } = require("../models");
const { Op } = require("sequelize");
class ProductController {
  static async getProduct(req, res) {
    try {
      let results = await product.findAll();
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  }
  static async create(req, res) {
    try {
      const { name, stock, price } = req.body;
      let results = await product.create({
        name,
        image: req.file.filename,
        stock: parseInt(stock),
        price: parseInt(price),
      });
      res.json(results);
    } catch (error) {
      res.json(error);
    }
  }
  static async delete(req, res) {
    try {
      const id = +req.params.id;
      let results = await product.destroy({
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
  static async update(req, res) {
    try {
      const id = +req.params.id;
      const { name, stock, price } = req.body;
      let results = await product.update(
        {
          name,
          image: req.file.filename,
          stock: parseInt(stock),
          price: parseInt(price),
        },
        {
          where: { id },
        }
      );
      if (results[0] === 1) {
        res.json(`id ${id} successfully updated`);
      } else {
        res.json(`id ${id} not found`);
      }
    } catch (error) {
      res.json(error);
    }
  }

  static async suggestion(req, res) {
    try {
      const { name } = req.query;
      let result = await product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      res.json(result)
    } catch (error) {
      res.json(error);
    }
  }
}

module.exports = ProductController;
