const express = require("express");
const {
  ceateProduct,
  fetchAllProducts,
  fetchProductById,
  updateProduct,
  deleteProduct,
} = require("../controller/Product");

const router = express.Router();

// /produts is already added in the base path so no need to add
router
  .post("/", ceateProduct)
  .get("/", fetchAllProducts)
  .get("/:id", fetchProductById)
  .patch("/:id", updateProduct)
  .delete("/:id", deleteProduct);

exports.router = router;
