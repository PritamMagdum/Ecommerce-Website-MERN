const { Cart } = require("../model/Cart");

exports.fetchCartByUser = async (req, res) => {
  const { user } = req.query;
  try {
    const cartItems = await Cart.find({ user: user })
      .populate("user")
      .populate("product");
    res.status(200).json(cartItems);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.addToCart = async (req, res) => {
  // This Product we have to get from API body
  const cart = new Cart(req.body);
  try {
    const response = await cart.save();
    const result = response.populate("product");
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json(err);
  }
};
