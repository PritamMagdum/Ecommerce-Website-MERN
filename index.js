const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Carts");
const ordersRouter = require("./routes/Orders");
const { User } = require("./model/User");

// Middlewares
server.use(
  session({
    secret: "keyboard cat",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
  })
);
server.use(passport.authenticate("session"));

server.use(
  cors({
    exposedHeaders: ["X-Total-Count"],
  })
);

server.use(express.json()); // to parse req.body
server.use("/products", productsRouter.router);
server.use("/brands", brandsRouter.router);
server.use("/categories", categoriesRouter.router);
server.use("/users", usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", cartRouter.router);
server.use("/orders", ordersRouter.router);

// Passport Strategy
passport.use(
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ email: username }).exec();
      console.log({ user });
      if (!user) {
        done(null, false, { message: "Invalid Credentials" });
      } else if (user.password === password) {
        done(null, user);
      } else {
        done(null, false, { message: "Invalid Credentials" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  })
);

// create a session variable in cookies
passport.serializeUser(function (user, cb) {
  process.nextTick(function () {
    console.log("serializaUser", user);
    return cb(null, { id: user.id, role: user.role });
  });
});

// fetch a session variable in cookies
passport.deserializeUser(function (user, cb) {
  console.log("de-serializaUser", user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

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
