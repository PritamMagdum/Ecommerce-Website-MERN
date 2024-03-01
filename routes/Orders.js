const express = require("express");
const {
  createOrder,
  fetchOrdersByUser,
  deleteOrder,
  updateOrder,
} = require("../controller/Order");

const router = express.Router();

// /Orders is already added in the base path so no need to add
router
  .post("/", createOrder)
  .get("/", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", updateOrder);

exports.router = router;
