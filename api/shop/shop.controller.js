const Shop = require("./shop.model");

const addShopItem = async (req, res) => {
  try {
    const shopItem = await Shop.create(req.body);
    res.status(201).json(shopItem);
  } catch (error) {
    res.send(error);
  }
};

const getAllShopItems = async (req, res) => {
  try {
    // get all by descending order

    const shop = await Shop.find({}).sort({ updatedAt: -1 });

    if (shop?.length) {
      res.status(200).send(shop);
    } else {
      res.status(200).josn({
        message: "No shop items found",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const getShopItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const shopItem = await Shop.findById(id);
    if (shopItem) {
      res.status(200).json(shopItem);
    } else {
      res.status(404).json({
        message: "shopItem not found",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const updateShopItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateShopItem = await Shop.findByIdAndUpdate(id, req.body);
    if (updateShopItem) {
      res.status(200).json({
        message: "Item updated successfully",
        updateShopItem,
      });
    }
  } catch (error) {
    res.send(error);
  }
};

const deleteShopItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteShopItem = await Shop.findByIdAndDelete(id);
    if (deleteShopItem) {
      res.status(200).json({
        message: "Ticket deleted successfully",
      });
    }
  } catch (error) {
    res.send(error);
  }
};

module.exports = {
  addShopItem,
  getAllShopItems,
  getShopItemById,
  updateShopItem,
  deleteShopItem,
};
