const express = require("express");
const passport = require("passport");

const { createUser, loginUser, checkUser } = require("../controller/Auth");

const router = express.Router();

// /users is already added in the base path so no need to add
router
  .post("/signup", createUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", checkUser);

exports.router = router;
