const invoiceRoutes = require("express").Router()
const InvoiceController = require("../controllers/InvoiceController")
invoiceRoutes.get("/",InvoiceController.getInvoice)
module.exports = invoiceRoutes