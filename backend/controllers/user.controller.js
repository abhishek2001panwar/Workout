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

    // create a token
    const token = createtoken(user.id);

    console.log(user);
    res.sendStatus(200).json({
      message: "User registered successfully",
      user,
      token,
      email,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to register user",
      error: error.message, // Send error message for debugging purposes
    });
  }
};
//login controllers
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createtoken(user.id);
    console.log(user);
    res.sendStatus(200).json({
      message: "User login successful",

      token,
      email,
    });
  } catch (error) {
    throw new Error(error);
  }

  res.send(200).json({
    message: "User login successful",
  });
};

const logoutUser = (req, res) => {
  // Clear the token cookie by setting it with an empty value and an expiration date in the past
  res.cookie("token", "", {
    expires: new Date(Date.now() - 1000),
    httpOnly: true, // Make the cookie accessible only via HTTP(S)
  });

  // Send a 200 status code along with a JSON response indicating successful logout
  res.status(200).json({
    message: "User logout successful",
  });
};



export { registerUser, loginUser ,logoutUser };
