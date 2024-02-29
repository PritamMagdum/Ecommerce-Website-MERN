const express = require("express");
const { addToCart, fetchCartByUser } = require("../controller/Cart");

const router = express.Router();

// /produts is already added in the base path so no need to add
router.post("/", addToCart).get("/", fetchCartByUser);

exports.router = router;
