const express = require("express");
const router = express.Router();
const {
  deleteUser,
  register,
  login,
  getUserById,
  updateUser,
  getAllUsers,
} = require("./users.controller");
const { auth, hasAuthority } = require("../../core/auth");

/**
 *
 *  hasAuthority middleware is used to check if the user is an admin
 *  auth middleware is used to check if the user is logged in
 *
 */

router.post("/register", register);
router.post("/login", login);

router.get("/", hasAuthority, getAllUsers);
router.get("/:id", auth, getUserById);

router.put("/:id", auth, updateUser);
router.delete("/:id", hasAuthority, deleteUser);

module.exports = router;
