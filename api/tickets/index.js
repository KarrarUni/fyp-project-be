const express = require("express");
const { auth, hasAuthority } = require("../../core/auth");
const {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
} = require("./tickets.controller");
const router = express.Router();

router.post("/create", hasAuthority, createTicket);

router.get("/", getAllTickets);
router.get("/:ticket_id", getTicketById);

router.put("/:ticket_id", hasAuthority, updateTicket);
router.delete("/:ticket_id", hasAuthority, deleteTicket);

module.exports = router;
