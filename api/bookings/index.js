const express = require("express");
const router = express.Router();
const { auth, hasAuthority } = require("../../core/auth");
const {
  bookOrder,
  getOrderDetails,
  getAllBookings,
  dispatchOrder,
  cancelOrder,
  deleteOrder,
} = require("./booking.controller");


router.post("/cancel", hasAuthority, cancelOrder);
router.post("/dispatch", hasAuthority, dispatchOrder);

router.post("/", auth, bookOrder);

router.get("/", auth, getOrderDetails);

router.get("/all", hasAuthority, getAllBookings);

router.delete("/:id", hasAuthority, deleteOrder);

module.exports = router;
