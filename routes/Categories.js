const express = require("express");
const { fetchCategories } = require("../controller/Category");

const router = express.Router();

// /categories is already added in the base path so no need to add
router.get("/", fetchCategories);

exports.router = router;
