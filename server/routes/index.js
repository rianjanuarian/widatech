const route = require("express").Router();

route.get("/", (req, res) => {
  res.json("homepage");
});

const invoiceRoutes = require("./invoice");
const productRoutes = require("./product");

route.use("/invoice", invoiceRoutes);
route.use("/product", productRoutes);

module.exports = route;
