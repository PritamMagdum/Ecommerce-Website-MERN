const { Order } = require("../model/Order");

exports.fetchOrdersByUser = async (req, res) => {
  const { id } = req.user;
  try {
    const orders = await Order.find({ user: id });
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
  console.log("request params -->", req.params);
  console.log("request body -->", req.body);
  try {
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.fetchAllOrders = async (req, res) => {
  // filter : {"category" : ["smartphone", "Laptops"]}
  // pagination : {_page:1, _per_page:10}

  let query = Order.find({});
  let totalOrdersQuery = Order.find({});

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

  const totalDocs = await totalOrdersQuery.count().exec();
  console.log({ totalDocs });

  if (req.query._page && req.query._per_page) {
    const pageSize = req.query._per_page;
    const page = req.query._page;
    query = query.skip(pageSize * (page - 1)).limit(pageSize);
    // console.log("this is total -->", query);
  }

  try {
    const docs = await query.exec();
    // const result = await cart.populate("product");
    res.set("X-Total-Count", totalDocs);
    // console.log(docs);
    res.status(200).json(docs);
  } catch (err) {
    res.status(400).json(err);
  }
};
