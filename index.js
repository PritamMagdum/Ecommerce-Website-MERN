const express = require("express");
const server = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const crypto = require("crypto");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const usersRouter = require("./routes/Users");
const authRouter = require("./routes/Auth");
const cartRouter = require("./routes/Carts");
const ordersRouter = require("./routes/Orders");
const { User } = require("./model/User");
const { isAuth, sanitizeUser, cookieExtractor } = require("./services/common");

const SECRET_KEY = "SECRET_KEY";
// JWT Options

// opts.jwtFromRequest = cookieExtractor;

const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = SECRET_KEY;

// Middlewares
server.use(express.static("build"));
server.use(cookieParser());
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
server.use("/products", isAuth(), productsRouter.router); // we can also use JWT Token
server.use("/brands", isAuth(), brandsRouter.router);
server.use("/categories", isAuth(), categoriesRouter.router);
server.use("/users", isAuth(), usersRouter.router);
server.use("/auth", authRouter.router);
server.use("/cart", isAuth(), cartRouter.router);
server.use("/orders", isAuth(), ordersRouter.router);

// Passport Strategy
passport.use(
  "local",
  new LocalStrategy({ usernameField: "email" }, async function (
    email,
    password,
    done
  ) {
    try {
      const user = await User.findOne({ email: email });
      console.log(email, password, user);
      if (!user) {
        done(null, false, { message: "Invalid Credentials" });
      }
      crypto.pbkdf2(
        password,
        user.salt,
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
          if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
            return done(null, false, { message: "Invalid Credentials" });
          }
          const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
          done(null, { token });
        }
      );
    } catch (err) {
      done(err);
    }
  })
);

// JWT Strategy
passport.use(
  "jwt",
  new JwtStrategy(opts, async function (jwt_payload, done) {
    console.log({ jwt_payload });
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) {
        return done(null, sanitizeUser(user));
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
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

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
  console.log("MongoDB Database Connected");
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
