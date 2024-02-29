const { User } = require("../model/User");

exports.createUser = async (req, res) => {
  // This Product we have to get from API body
  const user = new User(req.body);
  try {
    const response = await user.save();
    res.status(201).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
};
