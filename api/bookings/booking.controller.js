const Book = require("./booking.model");
const Ticket = require("../tickets/tickets.model");
const Shop = require("../shop/shop.model");
const jwt = require("jsonwebtoken");

const bookOrder = async (req, res) => {
  try {
    let tickets = [];
    let products = [];
    let total = 0;
    const { userId, cartItems, shippingDetail } = req.body;
    cartItems.forEach((item) => {
      if (item.type === "ticket") {
        tickets.push({
          id: item._id,
          quantity: item.quantity,
          total: item.quantity * item.price,
          sold: item.sold,
        });
      } else {
        products.push({
          id: item._id,
          quantity: item.quantity,
          total: item.quantity * item.price,
          sold: item.sold,
        });
      }
    });
    total =
      tickets.reduce((acc, item) => acc + item.total, 0) +
      products.reduce((acc, item) => acc + item.total, 0);
    tickets.length &&
      tickets.forEach(async (ticket) => {
        const ticketDetails = await Ticket.findById(ticket.id);
        if (ticketDetails) {
          const newTicket = await Ticket.findByIdAndUpdate(
            ticket.id,
            {
              $inc: { quantity: -ticket.quantity },
              sold: ticket.sold + ticket.quantity,
            },
            { new: true }
          );
        } else {
          throw new Error("Ticket not available");
        }
      });
    products.length &&
      products.forEach(async (shopItem) => {
        const ticketDetails = await Shop.findById(shopItem.id);
        if (ticketDetails) {
          const shopItems = await Shop.findByIdAndUpdate(
            shopItem.id,
            {
              $inc: { quantity: -shopItem.quantity },
              sold: shopItem.sold + shopItem.quantity,
            },
            { new: true }
          );
        } else {
          throw new Error("shopItem not available");
        }
      });

    const booking = new Book({
      user: userId,
      tickets: tickets.map((ticket) => ({
        ticket: ticket.id,
        quantity: ticket.quantity,
      })),
      products: products.map((product) => ({
        product: product.id,
        qunatity: product.qunatity,
      })),
      total_amount: total,
      shipping_details: shippingDetail,
    });
    await booking.save();
    return res.send(booking);
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const userId = jwt.decode(req.headers["authorization"].split(" ")[1]).id;
    const orders = await Book.find({
      user: userId,
    }).populate('user', 'first_name last_name')
    .populate('products.product', 'item price quantity image_url sold')
    .populate('tickets.ticket', 'match price image_url sold');
    if (orders) {
      res.send(orders); 
    }
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
};


const getAllBookings = async (req, res) => {
  try {
    const orders = await Book.find({}).populate('user', 'first_name last_name')
    .populate('products.product', 'item price quantity image_url sold')
    .populate('tickets.ticket', 'match price quantity image_url sold');
    if (orders) {
      res.send(orders);
    }
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
};

const dispatchOrder = async (req, res) => {
  try {
    const orderId = req.body._id;
    const order = await Book.findByIdAndUpdate(
      orderId,
      {
        $set: { status: "success" },
      },
      { new: true }
    );
    if (order) {
      res.send(order);
    }
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
};

const cancelOrder = async (req, res) => {
  try {
    const orderId = req.body._id;
    const order = await Book.findByIdAndUpdate(
      orderId,
      {
        $set: { status: "failed" },
      },
      { new: true }
    );
    if (order) {
      res.send(order);
    }
  } catch (error) {
    console.log("error: ", error);
    res.send(error);
  }
};


const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await Book.findByIdAndDelete(orderId);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send("Order not found");
    }
  } catch (error) {
    console.log("error: ", error);
    res.status(500).send("Internal server error");
  }
};

    

module.exports = {
  bookOrder,
  getOrderDetails,
  getAllBookings,
  cancelOrder,
  dispatchOrder,
  deleteOrder
};
