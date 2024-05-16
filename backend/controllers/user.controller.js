import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
//register controller
const createtoken = (id) => {
  return jwt.sign({ id }, "abhishek", { expiresIn: "3d" });
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createtoken(user.id);
    res.status(200).json({
      message: "User registered successfully",
      user,
      token,
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register user",
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createtoken(user.id);
    res.status(200).json({
      message: "User login successful",
      token,
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to login user",
      error: error.message,
    });
  }
};

const logoutUser = (req, res) => {
  try {
    res.clearCookie("token", { path: "/" }); // Clear the token cookie
    res.status(200).json({
      message: "User logout successful",
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

export { registerUser, loginUser, logoutUser };
