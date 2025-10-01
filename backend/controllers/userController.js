const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../config");

const userController = {
  // ==========================================================
  // REGISTER FUNCTION
  // ==========================================================
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const existingUser = await User.findOne({
        $or: [{ username }, { email }],
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Username or email already exists" });
      }

      const newUser = new User({ username, email, password });
      await newUser.save();

      const token = jwt.sign(
        {
          userId: newUser._id,
          isAdmin: newUser.isAdmin,
          isMechanic: newUser.isMechanic,
        },
        secretKey,
        {
          expiresIn: "1h",
        }
      );

      res.status(201).json({ message: "User registered successfully", token });
    } catch (error) {
      console.error("Error registering user:", error);
      res
        .status(500)
        .json({ message: "Failed to register user: Server Error" });
    }
  },

  // ==========================================================
  // LOGIN FUNCTION
  // ==========================================================
  login: async (req, res) => {
    // ==========================================================
    // !!! FINAL TEST: YEH LINE UNCOMMENT KAR DI GAYI HAI !!!
    // Ab server apne logs mein secret key print karega.
    console.log("SERVER IS USING THIS SECRET KEY:", secretKey);
    // ==========================================================

    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
          isAdmin: user.isAdmin,
          isMechanic: user.isMechanic,
        },
        secretKey,
        { expiresIn: "1h" }
      );

      user.tokens = user.tokens.concat({ token });
      await user.save();

      res
        .status(200)
        .json({ token, isAdmin: user.isAdmin, isMechanic: user.isMechanic });
    } catch (error) {
      console.error("Error logging in user:", error);
      res.status(500).json({ message: "Failed to login: Server Error" });
    }
  },

  // ==========================================================
  // GET USER PROFILE FUNCTION
  // ==========================================================
  getUserProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user.userId)
        .select("-password")
        .populate({
          path: "orders",
          populate: { path: "products.product" },
        })
        .populate({
          path: "appointments",
          populate: { path: "service" },
        });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error)      {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  // ... baaki ke functions ...
  updateUserProfile: async (req, res) => {
    try {
      const { username, email } = req.body;
      const updateData = { username, email };

      if (req.file) {
        updateData.profileImage = `/uploads/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(req.user.userId, updateData, {
        new: true,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user profile:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },

  deleteUserAccount: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.user.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User account deleted successfully" });
    } catch (error) {
      console.error("Error deleting user account:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users: Server Error" });
    }
  },

  updateUserRole: async (req, res) => {
    const { userId, isAdmin, isMechanic } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
      user.isAdmin = isAdmin;
      user.isMechanic = isMechanic;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};

module.exports = userController;