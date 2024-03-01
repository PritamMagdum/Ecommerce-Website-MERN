const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const orders = await Order.find({ user: user });
    //   .populate("user")
    //   .populate("product");
    res.status(200).json(orders);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createOrder = async (req, res) => {
  // This Product we have to get from API body
  //   console.log("Request is -->", req.body);
  const order = new Order(req.body);
  try {
    const response = await order.save();
    // const result = response.populate("product");
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByIdAndDelete(id);
    res.status(200).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};
