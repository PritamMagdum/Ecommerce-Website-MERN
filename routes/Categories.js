const express = require("express");
const { fetchCategories, createCategory } = require("../controller/Category");

const router = express.Router();

// /categories is already added in the base path so no need to add
router.get("/", fetchCategories).post("/", createCategory);

exports.router = router;
