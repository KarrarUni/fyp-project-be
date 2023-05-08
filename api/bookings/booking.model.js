const { Schema, model } = require("mongoose");

const bookingSchema = new Schema(
  {
    tickets: [
      {
        ticket: {
          type: Schema.Types.ObjectId,
          ref: "Ticket",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    total_amount: {
      type: Number,
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Shop",
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
    shipping_details: {
      address1: String,
      address2: String,
      city: String,
      state: String,
      country: String,
      zip: String,
    },
  },
  {
    timestamps: true,
  }
);

const Booking = model("Booking", bookingSchema);
module.exports = Booking;
