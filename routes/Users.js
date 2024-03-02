const express = require("express");
const { fetchUserById, updateUser } = require("../controller/User");

const router = express.Router();

// /users is already added in the base path so no need to add
router.get("/own", fetchUserById).patch("/:id", updateUser);

exports.router = router;
