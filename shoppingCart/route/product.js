const router = require("express").Router();
const productController = require("../controller/productController");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.delete("/:id", productController.removeProduct);
router.post("/", productController.createProduct);
router.post("/updateProduct", productController.updateProduct);

module.exports = router;