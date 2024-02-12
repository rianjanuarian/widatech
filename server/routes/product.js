const productRoutes = require("express").Router();
const ProductController = require("../controllers/ProductController");
const upload = require("../multerconfig");
productRoutes.get("/", ProductController.getProduct);
productRoutes.post("/create", upload.single("image"), ProductController.create);
productRoutes.delete("/delete/:id", ProductController.delete)
productRoutes.put("/update/:id",upload.single("image"), ProductController.update)
productRoutes.get("/suggestion", ProductController.suggestion)
module.exports = productRoutes;
