const express = require("express");
const server = express();
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const cors = require("cors");

// Middlewares
server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);
server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoriesRouter.router);

server.get("/", (req, res) => {
  res.json({ status: "success" });
});

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("MongoDB Database Connected");
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
