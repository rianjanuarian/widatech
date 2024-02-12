const { invoice,product,invoiceproduct } = require("../models");
class InvoiceController{
static async getInvoice(req,res){
    try {
        let results = await invoice.findAll({
            include: [product]
        })
        res.json(results)
    } catch (error) {
        res.json(error)
    }
}
}
module.exports = InvoiceController