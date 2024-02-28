const express = require("express");
const { ceateProduct, fetchAllProducts } = require("../controller/Product");

const router = express.Router();

// /produts is already added in the base path so no need to add
router.post("/", ceateProduct).get("/", fetchAllProducts);

exports.router = router;
