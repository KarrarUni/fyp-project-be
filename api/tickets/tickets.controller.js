const Tickets = require("./tickets.model");

const createTicket = async (req, res) => {
  try {
    const ticket = await Tickets.create(req.body);
    res.status(201).json(ticket);
  } catch (error) {
    res.send(error);
  }
};

const getAllTickets = async (req, res) => {
  try {
    // get all by descending order

    const tickets = await Tickets.find({}).sort({ updatedAt: -1 });

    if (tickets?.length) {
      res.status(200).send(tickets);
    } else {
      res.status(200).josn({
        message: "No tickets found",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const getTicketById = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const ticket = await Tickets.findById(ticket_id);
    if (ticket) {
      res.status(200).json(ticket);
    } else {
      res.status(404).json({
        message: "Ticket not found",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const updateTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const updateTicket = await Tickets.findByIdAndUpdate(ticket_id, req.body);
    if (updateTicket) {
      res.status(200).json({
        message: "Ticket updated successfully",
        updateTicket,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const deleteTicket = async (req, res) => {
  try {
    const { ticket_id } = req.params;
    const deleteTicket = await Tickets.findByIdAndDelete(ticket_id);
    if (deleteTicket) {
      res.status(200).json({
        message: "Ticket deleted successfully",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketById,
  updateTicket,
  deleteTicket,
};
