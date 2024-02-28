const express = require("express");
const { fetchBrands, createBrand } = require("../controller/Brand");

const router = express.Router();

// /brands is already added in the base path so no need to add
router.get("/", fetchBrands).post("/", createBrand);

exports.router = router;
