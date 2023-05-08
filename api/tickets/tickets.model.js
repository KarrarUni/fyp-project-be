const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    match: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    seat: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      enum: ["luxury", "vip", "economy"],
    },
    price: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    created_by: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image_url: {
      type: String,
    },
    sold: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;

/**
 * Testing sample
 */

// {
//   match: "Manchester United vs Liverpool",
// date: "2023-04-19",
// time: "20:00",
// seat: "A1",
// price: 100,
// total: 10,
// created_by: "60f1f1b5b9b1a8a0b4b1b1b1",
// sold_out: false,
// }
