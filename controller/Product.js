const { Product } = require("../model/Product");

exports.ceateProduct = async (req, res) => {
  // This Product we have to get from API body

  const product = new Product(req.body);
  try {
    const response = await product.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
