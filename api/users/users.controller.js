const User = require("./users.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const register = async (req, res) => {
  try {
    const email = req.body.email;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).json({ message: "User is already registered" });
    }

    const user = new User(req.body);
    const salt = await bcryptjs.genSalt(saltRounds);
    user.password = await bcryptjs.hash(user.password, salt);
    await user.save();
    res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(400).send(error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Verify password
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const filteredUser = { ...user._doc };
    filteredUser[
      "full_name"
    ] = `${filteredUser["first_name"]} ${filteredUser["last_name"]}`;
    delete filteredUser.password;

    const token = jwt.sign(
      {
        email: filteredUser.email,
        id: filteredUser._id,
        role: filteredUser.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.send({
      message: "Successfully Logged In",
      filteredUser,
      token,
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    user["full_name"] = `${user["first_name"]} ${user["last_name"]}`;
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const user = req.body;
    console.log('user: ', user);
    const updatedUser = await User.findByIdAndUpdate(user._id, user);
    if (updatedUser) {
      return res.status(200).json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.log('error: ', error);
    return res.status(400).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
