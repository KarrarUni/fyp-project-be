const express = require("express");
const { auth, hasAuthority } = require("../../core/auth");
const {
  addShopItem,
  getAllShopItems,
  getShopItemById,
  updateShopItem,
  deleteShopItem,
} = require("./shop.controller");
const router = express.Router();

router.post("/create", hasAuthority, addShopItem);

router.get("/", getAllShopItems);
router.get("/:id", getShopItemById);

router.put("/:id", hasAuthority, updateShopItem);
router.delete("/:id", hasAuthority, deleteShopItem);

module.exports = router;
