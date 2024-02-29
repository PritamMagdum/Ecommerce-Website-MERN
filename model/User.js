const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roel: {
    type: String,
    required: true,
  },
  addresses: {
    type: [Mixed],
  },
  name: {
    type: String,
  },
  orders: {
    type: [Mixed],
  },
});

const virtual = userSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

userSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});
exports.Brand = mongoose.model("Brand", userSchema);
