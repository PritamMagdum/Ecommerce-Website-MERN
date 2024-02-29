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

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email }).exec();
    console.log({ user });
    if (!user) {
      res.status(401).json({ message: "no such user email" });
    } else if (user.password === req.body.password) {
      res
        .status(200)
        .json({
          id: user.id,
          email: user.email,
          name: user.name,
          addresses: user.addresses,
        });
    } else {
      res.status(401).json({ message: "envalid credentials" });
    }
  } catch (err) {
    res.status(400).json(err);
  }
};
