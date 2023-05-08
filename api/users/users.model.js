const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: true,
    },
    last_name: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      lowercase: true,
    },
    date_of_birth: {
      type: Date,
      required: false,
    },
    gender: {
      type: String,
      lowercase: true,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      lowercase: true,
      enum: ["user", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;

/**
 *
 * sample data for testing
 *
 */

// {
//   "first_name": "John",
//   "last_name": "Doe",
//   "email": "john_doe@gmail.com",
//   "phone": "1234567890",
//   "date_of_birth": "1990-01-01",
//   "role": "user",
//   "gender": "male",
//   "password": "123456"
// }
