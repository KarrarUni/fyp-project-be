const express = require("express");
const router = express.Router();
const User = require("../users/users.model");
const Booking = require("../bookings/booking.model");
const moment = require("moment");

router.get("/users", async (req, res) => {
  try {
    const total = await User.countDocuments();
    const weeklyUsers = await User.countDocuments({
      createdAt: {
        $gte: moment().subtract(7, "days").toDate(),
      },
    });
    const monthlyUsers = await User.countDocuments({
      createdAt: {
        $gte: moment().subtract(30, "days").toDate(),
      },
    });
    res.status(200).json({
      total,
      weeklyUsers,
      monthlyUsers,
    });
  } catch (error) {
    res.send(error);
  }
});

router.get("/revenue", async (req, res) => {
  try {
    const revenue = await Booking.aggregate([
      {
        $group: {
            _id: null,
          total: { $sum: "$total_amount" },
        },
      },
    ]);

    const weeklyRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(7, "days").toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
                  total: { $sum: "$total_amount" },
        },
      },
    ]);

    const monthlyRevenue = await Booking.aggregate([
      {
        $match: {
          createdAt: {
            $gte: moment().subtract(30, "days").toDate(),
          },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$total_amount" },
        },
      },
    ]);

    res.status(200).json({
      revenue,
      weeklyRevenue,
      monthlyRevenue,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

module.exports = router;
