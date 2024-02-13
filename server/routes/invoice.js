const invoiceRoutes = require("express").Router();
const InvoiceController = require("../controllers/InvoiceController");
invoiceRoutes.get("/", InvoiceController.getInvoice);
invoiceRoutes.post("/create", InvoiceController.create);
invoiceRoutes.delete("/delete/:id",InvoiceController.delete)
invoiceRoutes.get("/detail/:id",InvoiceController.detail)
module.exports = invoiceRoutes;
